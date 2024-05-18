use rocket::get;
use rocket::serde::{Deserialize, Serialize};
use rocket::serde::json::Json;
use rocket_okapi::{JsonSchema, openapi};

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FuelLog {
    pub id: i32,
    pub odometer: f32,
    pub flagged: bool,
}

#[openapi(tag = "Logs")]
#[get("/logs")]
pub fn get_logs() -> Json<FuelLog> {
    Json(FuelLog {
        id: 0,
        odometer: 0.0,
        flagged: false,
    })
}