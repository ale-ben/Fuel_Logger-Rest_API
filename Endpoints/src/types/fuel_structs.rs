use chrono::{DateTime, TimeZone, Utc};
use rocket::serde::{Deserialize, Serialize};
use rocket::{get, serde::json::Json};
use rocket_okapi::okapi::schemars;
use rocket_okapi::okapi::schemars::JsonSchema;
use rocket_okapi::openapi;

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FuelLogStruct {
    pub id: Option<i32>,
    pub date: DateTime<Utc>,
    pub amount: f32,
    pub cost: f32,
    pub odometer: f32,
    pub composite_log: Option<i32>,
    pub flagged: Option<bool>
}