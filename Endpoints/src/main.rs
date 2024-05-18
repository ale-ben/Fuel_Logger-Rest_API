use rocket::{get};
use rocket::serde::json::Json;
use rocket_okapi::okapi::schemars;
use rocket_okapi::okapi::schemars::JsonSchema;
use rocket_okapi::{openapi, openapi_get_routes, swagger_ui::*};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FuelEntry {
    pub id: i32,
    pub date: i32,
    pub amount: f32,
    pub cost: f32,
}

#[openapi(tag = "Entries")]
#[get("/")]
fn index() -> Json<FuelEntry> {
    Json(FuelEntry {
        id: 0,
        date: 5,
        amount: 0.0,
        cost: 0.0,
    })
}

#[rocket::main]
async fn main() {
    let launch_result = rocket::build()
        .mount(
            "/",
            openapi_get_routes![
                index
            ],
        )
        .mount(
            "/swagger-ui/",
            make_swagger_ui(&SwaggerUIConfig {
                url: "../openapi.json".to_owned(),
                ..Default::default()
            }),
        )
        .launch()
        .await;
    match launch_result {
        Ok(_) => println!("Rocket shut down gracefully."),
        Err(err) => println!("Rocket had an error: {}", err),
    };
}