
use rocket::get;
use rocket::serde::json::Json;
use rocket_okapi::{openapi, openapi_get_routes, swagger_ui::*};

use controller::logs;
use crate::types::fuel_structs::FuelLogStruct;

mod controller;
mod storage;
mod types;

#[rocket::main]
async fn main() {

    #[openapi(tag = "Test")]
    #[get("/test")]
    pub async fn test() {

        println!("Done")
    }

    let launch_result = rocket::build().mount(
        "/",
        openapi_get_routes![
                logs::get_logs,
                logs::get_log,
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