use frankenstein::{
    AllowedUpdate, Api, BotCommand, GetUpdatesParams, ReplyParameters, SendMessageParams,
    SetMyCommandsParams, TelegramApi, Update,
};

pub struct TelegramClient {
    api: Api,
    last_update: u32,
}

impl TelegramClient {
    pub fn new(key: &str) -> Self {
        let bot_commands: [BotCommand; 2] = [
            BotCommand::builder()
                .command("/ping")
                .description("You guessed it...")
                .build(),
            BotCommand::builder()
                .command("newlog")
                .description("Add a new log to the database")
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

    fn get_update_params(&self) -> GetUpdatesParams {
        let update_params = GetUpdatesParams::builder()
            .allowed_updates(vec![AllowedUpdate::Message])
            .timeout(60_u32);

        if self.last_update != 0 {
            update_params.offset(self.last_update + 1).build()
        } else {
            update_params.build()
        }
    }

    pub fn send_message(&self, chat: i64, message: i32, text: &str) {
        let reply_parameters = ReplyParameters::builder().message_id(message).build();

        let send_message_params = SendMessageParams::builder()
            .chat_id(chat)
            .text(text)
            .reply_parameters(reply_parameters)
            .build();

        if let Err(err) = self.api.send_message(&send_message_params) {
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
}