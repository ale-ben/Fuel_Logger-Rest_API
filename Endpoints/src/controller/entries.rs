use rocket::get;
use rocket::serde::{Deserialize, Serialize};
use rocket::serde::json::Json;
use rocket_okapi::{JsonSchema, openapi};

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FuelEntry {
    pub id: i32,
    pub date: i32,
    pub amount: f32,
    pub cost: f32,
    pub fuel_log: i32
}

#[openapi(tag = "Entries")]
#[get("/entries")]
pub fn get_entries() -> Json<FuelEntry> {
    Json(FuelEntry {
        id: 0,
        date: 5,
        amount: 0.0,
        cost: 0.0,
        fuel_log: 0
    })
}