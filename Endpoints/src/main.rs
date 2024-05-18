use rocket_okapi::{openapi_get_routes, swagger_ui::*};
use rocket_okapi::okapi::schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use controller::entries;
use controller::logs;

mod controller;

#[rocket::main]
async fn main() {
    let launch_result = rocket::build().mount(
        "/",
        openapi_get_routes![
                entries::get_entries,
                logs::get_logs
            ],
    ).mount(
        "/swagger-ui/",
        make_swagger_ui(&SwaggerUIConfig {
            url: "../openapi.json".to_owned(),
            ..Default::default()
        }),
    ).launch().await;
    match launch_result {
        Ok(_) => println!("Rocket shut down gracefully."),
        Err(err) => println!("Rocket had an error: {}", err),
    };
}