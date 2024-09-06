use rocket::{get, post, serde::json::Json};
use rocket_okapi::openapi;

use crate::types::fuel_structs::{FuelLogStruct, NewFuelLogStruct};

#[openapi(tag = "Logs")]
#[get("/logs/all")]
pub fn get_logs() -> Json<Vec<FuelLogStruct>> {
    Json(vec![
        FuelLogStruct {
            id: 0,
            date: Default::default(),
            amount: 0.0,
            cost: 0.0,
            odometer: 0.0
        },
        FuelLogStruct {
            id: 1,
            date: Default::default(),
            amount: 0.0,
            cost: 0.0,
            odometer: 0.0
        },
    ])
}

#[openapi(tag = "Logs")]
#[get("/logs/<log_id>")]
pub fn get_log(log_id: i32) -> Json<Option<FuelLogStruct>> {
    Json(Some(FuelLogStruct {
        id: log_id,
        date: Default::default(),
        amount: 0.0,
        cost: 0.0,
        odometer: 0.0
    }))
}

#[openapi(tag = "Logs")]
#[post("/logs/new", data = "<log>")]
pub fn new_log(log: Json<NewFuelLogStruct>) -> Json<Result<FuelLogStruct, String>> {
    // Check if all fields are filled
    if log.date == 0 || log.amount == 0.0 || log.cost == 0.0 || log.odometer == 0.0 {
        return Json(Err("All fields must be filled".to_string()));
    }

    // Check if the price is correct
    if log.price != log.cost / log.amount {
        return Json(Err("Price is incorrect".to_string()));
    }

    // Create a new log
    Json(Ok(FuelLogStruct {
        id: 0,
        date: log.date,
        amount: log.amount,
        cost: log.cost,
        odometer: log.odometer
    }))
}