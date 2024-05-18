use frankenstein::{
    AllowedUpdate, Api, BotCommand, EditMessageReplyMarkupParams, Error, GetUpdatesParams,
    InlineKeyboardButton, InlineKeyboardMarkup, Message, MethodResponse, ParseMode, ReplyMarkup,
    ReplyParameters, SendMessageParams, SetMyCommandsParams, TelegramApi, Update, UpdateContent,
};
use time::format_description;

use crate::database::models::CompleteLog;

const AUTHORIZED_USERS: [(&str, u64); 1] = [("aleben", 49768658)];

pub struct TelegramClient {
    api: Api,
    last_update: u32,
}

impl TelegramClient {
    pub fn new(key: &str) -> Self {
        let bot_commands: [BotCommand; 4] = [
            BotCommand::builder()
                .command("ping")
                .description("You guessed it...")
                .build(),
            BotCommand::builder()
                .command("newlog")
                .description("Add a new log to the database")
                .build(),
			BotCommand::builder()
				.command("stats")
				.description("General statistics")
				.build(),
            BotCommand::builder()
                .command("clear")
                .description("Removes the log being created")
                .build(),
        ];

        let api = Api::new(key);
        let response = api.set_my_commands(
            &SetMyCommandsParams::builder()
                .commands(bot_commands.to_vec())
                .build(),
        );

        match response {
            Ok(result) => {
                if result.ok {
                    debug!("Commands set correctly")
                } else {
                    warn!("Set commands returned false ({0:?})", result.description)
                }
            }
            Err(err) => {
                warn!("Set commands failed with error {err:?}")
            }
        }

        Self {
            api,
            last_update: 0,
        }
    }

    pub fn authenticate(update: &UpdateContent) -> bool {
        if let UpdateContent::Message(message) = update {
            if let Some(user) = &message.from {
                return AUTHORIZED_USERS.into_iter().any(|usr| usr.1 == user.id);
            } else {
                return false;
            }
        } else {
            if let UpdateContent::CallbackQuery(query) = update {
                return AUTHORIZED_USERS
                    .into_iter()
                    .any(|usr| usr.1 == query.from.id);
            }
        }
        false
    }

    fn get_update_params(&self) -> GetUpdatesParams {
        let update_params = GetUpdatesParams::builder()
            .allowed_updates(vec![AllowedUpdate::Message, AllowedUpdate::CallbackQuery])
            .timeout(60_u32);

        if self.last_update != 0 {
            update_params.offset(self.last_update + 1).build()
        } else {
            update_params.build()
        }
    }

    pub fn send_message(&self, chat: i64, reply_to_msg: Option<i32>, text: &str) {
        let send_message_params = SendMessageParams::builder().chat_id(chat).text(text);

        let result: Result<MethodResponse<Message>, Error>;

        if let Some(msg_id) = reply_to_msg {
            let reply_parameters = ReplyParameters::builder().message_id(msg_id).build();
            let send_message_params = send_message_params
                .reply_parameters(reply_parameters)
                .build();
            result = self.api.send_message(&send_message_params);
        } else {
            result = self.api.send_message(&send_message_params.build())
        }

        if let Err(err) = result {
            warn!("Failed to send message: {err:?}");
        }
    }

    pub fn get_updates(&mut self) -> Result<Vec<Update>, &str> {
        let result = self.api.get_updates(&self.get_update_params());

        match result {
            Ok(response) => {
                if !response.result.is_empty() {
                    trace!("result: {0:?}", response.result);
                }

                let last_id = response.result.iter().map(|update| update.update_id).max();

                match last_id {
                    Some(id) => {
                        self.last_update = id;
                        Ok(response.result)
                    }
                    None => Err("Unable to determine last id in result"),
                }
            }
            Err(error) => {
                warn!("Failed to get updates: {error:?}");
                Err("Failed to get updates")
            }
        }
    }

    pub fn send_recap(&self, chat: i64, fuel_log: &CompleteLog) {
        let format = format_description::parse("[day]/[month]/[year] - [hour]:[minute]")
            .expect("Something went wrong in formatter");

        let msg = format!(
            "New log ({:?}):\n*{}* _Km_\n*{}* _L_\n*{}* _€_\n*{}* _€/L_",
            fuel_log.entries[0]
                .date
                .format(&format)
                .expect("Something went wrong with date parsing"),
            fuel_log.log.odometer,
            fuel_log.entries[0].amount,
            fuel_log.entries[0].cost,
            fuel_log.entries[0].cost / fuel_log.entries[0].amount
        )
        .replace("(", "\\(") //TODO: What is still needed?
        .replace(")", "\\)")
        .replace("-", "\\-")
        .replace(".", "\\.");
        trace!("Recap output string: {msg}");
        let inline_kbd = InlineKeyboardMarkup::builder()
            .inline_keyboard(vec![vec![
                InlineKeyboardButton::builder()
                    .text("Save")
                    .callback_data("save")
                    .build(),
                InlineKeyboardButton::builder()
                    .text("Clear")
                    .callback_data("clear")
                    .build(),
            ]])
            .build();
        let send_message_params = SendMessageParams::builder()
            .chat_id(chat)
            .text(msg)
            .reply_markup(ReplyMarkup::InlineKeyboardMarkup(inline_kbd))
            .parse_mode(ParseMode::MarkdownV2);
        let result = self.api.send_message(&send_message_params.build());

        if let Err(err) = result {
            warn!("Failed to send message: {err:?}");
        }
    }

    pub fn remove_message_reply_markup(&self, chat_id: i64, message_id: i32) {
        let params = EditMessageReplyMarkupParams::builder()
            .chat_id(chat_id)
            .message_id(message_id)
            .build();

        let res = self.api.edit_message_reply_markup(&params);

        if let Err(err) = res {
            error!("{err}")
        }
    }
}
