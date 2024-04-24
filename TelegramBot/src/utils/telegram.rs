use frankenstein::{AllowedUpdate, Api, GetUpdatesParams, ReplyParameters, SendMessageParams, TelegramApi, Update};

pub struct TelegramClient {
    api: Api,
	update_params: GetUpdatesParams,
}

impl TelegramClient {
    pub fn new(key: &str) -> Self {
        Self { api: Api::new(key), update_params: GetUpdatesParams::builder().timeout(60 as u32).build() }
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

    pub fn get_updates(&mut self) -> Result<Vec<Update>, &str>{
		let result = self.api.get_updates(&(self.update_params));

		match result {
            Ok(response) => {
                if !response.result.is_empty() {
                    trace!("result: {0:?}", response.result);
                }

				let last_id = response.result.iter().map(|update| update.update_id).max();

				match last_id {
					Some(id) => {
						self.update_params = GetUpdatesParams::builder()
						.timeout(60 as u32)
                        .offset(id + 1)
						.allowed_updates(vec![AllowedUpdate::Message])
                        .build();

						Ok(response.result)
					}
					None => {
						Err("Unable to determine last id in result")
					}
				}

				
            }
            Err(error) => {
                warn!("Failed to get updates: {error:?}");
				Err("Failed to get updates")
            }
        }
	}
}
