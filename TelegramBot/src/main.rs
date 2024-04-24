use frankenstein::Update;
use frankenstein::UpdateContent;

extern crate dotenv;

use dotenv::dotenv;
use lovely_env_logger::Config;
use std::env;

mod utils;
use utils::telegram::TelegramClient;

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

    let token = env::var("FL_TELEGRAM_TOKEN").unwrap();
    let client = TelegramClient::new(&token);

    polling(client);
}

fn polling(mut client: TelegramClient) {

    loop {
      let updates = client.get_updates();

		if let Ok(updates) = updates {
			for update in updates {
				handle_update(&client, update)
			}
		}


       
    }
}

fn handle_update(client: &TelegramClient, update: Update) {
    if let UpdateContent::Message(message) = update.content {
        client.send_message(message.chat.id, message.message_id, "Hello")
    }
}
