use dotenvy::dotenv;
use lovely_env_logger::Config;
use rocket::get;
use rocket_okapi::{openapi, openapi_get_routes, swagger_ui::*};

use controller::logs;

mod controller;
mod types;

#[openapi(tag = "Test")]
#[get("/test")]
pub async fn test() {
    println!("Done")
}

#[rocket::main]
async fn main() {
    // Init logger RUST_LOG=fuel_logger_telegram_bot=trace cargo run
    lovely_env_logger::init(Config {
        with_line_number: true,
        ..Config::new_reltime()
    });
 
    // Init env
    dotenv().expect(".env file not found");

    let launch_result = rocket::build()
        .mount(
            "/",
            openapi_get_routes![
                logs::get_logs,
                logs::get_log,
                logs::new_log,
                test
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