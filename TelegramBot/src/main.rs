use frankenstein::GetUpdatesParams;
use frankenstein::ReplyParameters;
use frankenstein::SendMessageParams;
use frankenstein::TelegramApi;
use frankenstein::{Api, UpdateContent};

extern crate dotenv;

use dotenv::dotenv;
use lovely_env_logger::Config;
use std::env;

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

    let api = Api::new(&token);

    let update_params_builder = GetUpdatesParams::builder();
    let mut update_params = update_params_builder.clone().build();

    loop {
        let result = api.get_updates(&update_params);

        match result {
            Ok(response) => {
                if !response.result.is_empty() {
                    trace!("result: {0:?}", response.result);
                }

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
                warn!("Failed to get updates: {error:?}");
            }
        }
    }
}

fn send_message(api: &Api, chat: i64, message: i32, text: &str) {
    let reply_parameters = ReplyParameters::builder().message_id(message).build();

    let send_message_params = SendMessageParams::builder()
        .chat_id(chat)
        .text(text)
        .reply_parameters(reply_parameters)
        .build();

    if let Err(err) = api.send_message(&send_message_params) {
        warn!("Failed to send message: {err:?}");
    }
}
