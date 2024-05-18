use rocket::{get, serde::json::Json};
use rocket_okapi::okapi::schemars;
use rocket_okapi::okapi::schemars::JsonSchema;
use rocket_okapi::openapi;
use serde::{Deserialize, Serialize};

use crate::controller::logs::FuelLog;

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FuelEntry {
    pub id: Option<i32>,
    pub date: i32,
    pub amount: f32,
    pub cost: f32,
    pub fuel_log: i32,
}

#[openapi(tag = "Entries")]
#[get("/entries/all")]
pub fn get_entries() -> Json<Vec<FuelEntry>> {
    Json(vec![FuelEntry {
        id: Some(0),
        date: 5,
        amount: 0.0,
        cost: 0.0,
        fuel_log: 0,
    }, FuelEntry {
        id: Some(1),
        date: 5,
        amount: 0.0,
        cost: 0.0,
        fuel_log: 0,
    }])
}

#[openapi(tag = "Entries")]
#[get("/entries/<entry_id>")]
pub fn get_entry(entry_id: i32) -> Json<Option<FuelEntry>> {
    Json(Some(FuelEntry {
        id: Some(entry_id),
        date: 5,
        amount: 0.0,
        cost: 0.0,
        fuel_log: 0,
    }))
}