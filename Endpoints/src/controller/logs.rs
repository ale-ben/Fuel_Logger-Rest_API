use rocket::{get, serde::json::Json};
use rocket_okapi::openapi;
use serde::{Deserialize, Serialize};

use crate::types::fuel_structs::FuelLogStruct;

#[openapi(tag = "Logs")]
#[get("/logs/all")]
pub fn get_logs() -> Json<Vec<FuelLogStruct>> {
    Json(vec![
        FuelLogStruct {
            id: Some(0),
            date: Default::default(),
            amount: 0.0,
            cost: 0.0,
            odometer: 0.0,
            composite_log: None,
            flagged: None,
        },
        FuelLogStruct {
            id: Some(1),
            date: Default::default(),
            amount: 0.0,
            cost: 0.0,
            odometer: 0.0,
            composite_log: None,
            flagged: Some(true),
        },
    ])
}

#[openapi(tag = "Logs")]
#[get("/logs/<log_id>")]
pub fn get_log(log_id: i32) -> Json<Option<FuelLogStruct>> {
    Json(Some(FuelLogStruct {
        id: Some(log_id),
        date: Default::default(),
        amount: 0.0,
        cost: 0.0,
        odometer: 0.0,
        composite_log: None,
        flagged: Some(false),
    }))
}