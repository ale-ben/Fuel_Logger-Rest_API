use database::models::CompleteLog;
use database::models::FuelEntry;
use database::models::FuelLog;
use frankenstein::CallbackQuery;
use frankenstein::MaybeInaccessibleMessage;
use frankenstein::Message;
use frankenstein::Update;
use frankenstein::UpdateContent;

extern crate dotenv;

use dotenv::dotenv;
use lovely_env_logger::Config;
use std::env;

mod utils;
use utils::telegram::TelegramClient;

mod database;
use database::database::DB;

use crate::database::models::NewCompleteLog;
use crate::database::models::NewFuelEntry;

extern crate lovely_env_logger;
#[macro_use]
extern crate log;

fn main() {
    // Init logger RUST_LOG=fuel_logger_telegram_bot=trace cargo run
    lovely_env_logger::init(Config {
        with_line_number: true,
        ..Config::new_reltime()
    });

    // Init env
    dotenv().ok();

    let db = DB::establish_connection();

    let token = env::var("FL_TELEGRAM_TOKEN").unwrap();
    let client = TelegramClient::new(&token);

    polling(client, db);
}

fn polling(mut client: TelegramClient, mut db: DB) {
    let mut current_log: Option<CompleteLog> = None;

    loop {
        let updates = client.get_updates();

        if let Ok(updates) = updates {
            for update in updates {
                current_log = handle_update(&client, update, current_log, &mut db);
            }
        }
    }
}

fn handle_update(
    client: &TelegramClient,
    update: Update,
    current_log: Option<CompleteLog>,
    db: &mut DB,
) -> Option<CompleteLog> {
    if TelegramClient::authenticate(&update.content) {
        if let UpdateContent::Message(message) = update.content {
            return handle_update_message(client, message, current_log);
        } else {
            if let UpdateContent::CallbackQuery(query) = update.content {
                return handle_update_callback_query(client, query, current_log, db);
            }
        }
    } else {
        warn!("Unauthorized user");
		let txt = "User is not authorized.";
		if let UpdateContent::Message(message) = update.content {
			client.send_message(message.chat.id, None, txt);
        } else {
            if let UpdateContent::CallbackQuery(query) = update.content {
				if let Some(maybe_msg) = query.message {
					if let MaybeInaccessibleMessage::Message(msg) = maybe_msg {
						client.send_message(msg.chat.id, None, txt);
					}
				}
            }
        }
    }
    current_log
}

fn handle_update_message(
    client: &TelegramClient,
    message: Message,
    current_log: Option<CompleteLog>,
) -> Option<CompleteLog> {
    if let Some(text) = message.text {
        if text.starts_with('/') {
            // This is a command
            match text.as_str() {
                "/ping" => {
                    client.send_message(message.chat.id, Some(message.message_id), "pong");
                    return current_log;
                }
                "/newlog" => {
                    client.send_message(message.chat.id, None, "Odometer: (Km)");
                    return Some(CompleteLog {
                        log: FuelLog::new(),
                        entries: vec![FuelEntry::new()],
                    });
                }
                "/clear" => {
                    client.send_message(message.chat.id, None, "Log cleared");
                    return None;
                }
                _ => {
                    warn!("Unknown command: {text}");
                    client.send_message(
                        message.chat.id,
                        Some(message.message_id),
                        "This command is not known",
                    );
                    return current_log;
                }
            }
        } else {
            // This is a normal message
            match current_log {
                None => return None,
                Some(mut fuel_log) => {
                    if fuel_log.log.odometer == 0_f32 {
                        if let Ok(odo) = text.to_lowercase().replace("km", "").parse::<f32>() {
                            fuel_log.log.odometer = odo;
                            debug!("Odometer set to {odo}");
                            client.send_message(message.chat.id, None, "Amount: (L)");
                        } else {
                            warn!("Unable to parse string {text}");
                            client.send_message(
                                message.chat.id,
                                Some(message.message_id),
                                "Unable to parse message.",
                            );
                            client.send_message(message.chat.id, None, "Odometer: (Km)");
                        }
                        return Some(fuel_log);
                    } else {
                        if fuel_log.entries.is_empty() {
                            fuel_log.entries.push(FuelEntry::new());
                        }
                        if fuel_log.entries[0].amount == 0_f32 {
                            if let Ok(amount) = text.to_lowercase().replace("l", "").parse::<f32>()
                            {
                                fuel_log.entries[0].amount = amount;
                                debug!("Amount set to {amount}");
                                client.send_message(message.chat.id, None, "Cost: (€)");
                            } else {
                                warn!("Unable to parse string {text}");
                                client.send_message(
                                    message.chat.id,
                                    Some(message.message_id),
                                    "Unable to parse message.",
                                );
                                client.send_message(message.chat.id, None, "Amount: (L)");
                            }
                            return Some(fuel_log);
                        } else {
                            if fuel_log.entries[0].cost == 0_f32 {
                                if let Ok(cost) =
                                    text.to_lowercase().replace("€", "").parse::<f32>()
                                {
                                    fuel_log.entries[0].cost = cost;
                                    debug!("Cost set to {cost}");
                                    client.send_recap(message.chat.id, &fuel_log);
                                } else {
                                    warn!("Unable to parse string {text}");
                                    client.send_message(
                                        message.chat.id,
                                        Some(message.message_id),
                                        "Unable to parse message.",
                                    );
                                    client.send_message(message.chat.id, None, "Cost: (€)");
                                }
                                return Some(fuel_log);
                            } else {
                                // TODO: WTF happens here??
                            }
                        }
                        return Some(fuel_log);
                    }
                }
            }
        }
    }
    current_log
}

fn handle_update_callback_query(
    client: &TelegramClient,
    query: CallbackQuery,
    current_log: Option<CompleteLog>,
    db: &mut DB,
) -> Option<CompleteLog> {
    if let Some(data) = query.data {
        match data.as_str() {
            "save" => {
                info!("Save log");
                match &current_log {
                    Some(log) => {
                        let entries: Vec<NewFuelEntry> = log
                            .entries
                            .iter()
                            .map(|entry| entry.to_new_fuel_entry())
                            .collect();
                        let res = db.save_log(NewCompleteLog {
                            log: log.log.to_new_fuel_log(),
                            entries,
                        });

                        if let Some(maybe_msg) = query.message {
                            if let MaybeInaccessibleMessage::Message(msg) = maybe_msg {
                                if res {
                                    client.remove_message_reply_markup(msg.chat.id, msg.message_id);
									client.send_message(msg.chat.id, None, "✅ Log saved");
									return None;
                                } else {
									client.send_message(msg.chat.id, None, "❌ There was a problem saving the log. Please retry");
									return current_log;
                                }
                            }
                        }
                    }
                    None => {
                        warn!("Trying to save inexistent log");
                        if let Some(maybe_msg) = query.message {
                            if let MaybeInaccessibleMessage::Message(msg) = maybe_msg {
                                client.remove_message_reply_markup(msg.chat.id, msg.message_id)
                            }
                        }
						return None;
                    }
                }
            }
            "clear" => {
                info!("Clear log");
                if let Some(maybe_msg) = query.message {
                    if let MaybeInaccessibleMessage::Message(msg) = maybe_msg {
                        client.remove_message_reply_markup(msg.chat.id, msg.message_id);
                        client.send_message(msg.chat.id, None, "Log cleared");
                    }
                }
                return None;
            }
            _ => {
                warn!("Unknown case reached in handle_update_callback_query");
                if let Some(maybe_message) = query.message {
                    if let MaybeInaccessibleMessage::Message(msg) = maybe_message {
                        client.send_message(msg.chat.id, None, "❌ You should win a prize for your ability in reaching unreachable branches...\nPlease report this!");
                    }
                }
				return current_log;
            }
        }
    }
    current_log
}
