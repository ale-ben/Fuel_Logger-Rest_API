use rocket::{get, serde::json::Json};
use rocket_okapi::okapi::schemars;
use rocket_okapi::okapi::schemars::JsonSchema;
use rocket_okapi::openapi;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FuelLog {
    pub id: Option<i32>,
    pub odometer: f32,
    pub flagged: bool,
}

#[openapi(tag = "Logs")]
#[get("/logs/all")]
pub fn get_logs() -> Json<Vec<FuelLog>> {
    Json(vec![FuelLog {
        id: Some(0),
        odometer: 0.0,
        flagged: false,
    }])
}

#[openapi(tag = "Logs")]
#[get("/logs/<log_id>")]
pub fn get_log(log_id: i32) -> Json<Option<FuelLog>> {
    Json(Some(FuelLog {
        id: Some(log_id),
        odometer: 0.0,
        flagged: false,
    }))
}