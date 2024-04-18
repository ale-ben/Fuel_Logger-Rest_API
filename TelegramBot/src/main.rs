use frankenstein::GetUpdatesParams;
use frankenstein::ReplyParameters;
use frankenstein::SendMessageParams;
use frankenstein::TelegramApi;
use frankenstein::{Api, UpdateContent};

extern crate dotenv;

use dotenv::dotenv;
use std::env;

fn main() {

	dotenv().ok();

	let TOKEN = env::var("FL_TELEGRAM_TOKEN").unwrap();

    let api = Api::new(&TOKEN);

    let update_params_builder = GetUpdatesParams::builder();
    let mut update_params = update_params_builder.clone().build();

    loop {
        let result = api.get_updates(&update_params);

        println!("result: {result:?}");

        match result {
            Ok(response) => {
				

                for update in response.result {
                    if let UpdateContent::Message(message) = update.content {
						send_message(&api, message.chat.id, message.message_id, "Hello")
					}
                    update_params = update_params_builder
                        .clone()
                        .offset(update.update_id + 1)
                        .build();
                }
            }
            Err(error) => {
                println!("Failed to get updates: {error:?}");
            }
        }
    }
}

fn send_message(api: &Api, chat: i64, message: i32, text: &str) {
    let reply_parameters = ReplyParameters::builder().message_id(message).build();

    let send_message_params = SendMessageParams::builder()
        .chat_id(chat)
        .text("hello")
        .reply_parameters(reply_parameters)
        .build();

    if let Err(err) = api.send_message(&send_message_params) {
        println!("Failed to send message: {err:?}");
    }
}
