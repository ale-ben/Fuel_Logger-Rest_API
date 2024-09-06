use rocket::serde::{Deserialize, Serialize};
use rocket_okapi::okapi::schemars;
use rocket_okapi::okapi::schemars::JsonSchema;

#[derive(Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct NewFuelLogStruct {
    pub date: i64,
    pub odometer: f64,
    pub amount: f64,
    pub cost: f64,
    pub price: f64,
}

#[derive(Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct FuelLogStruct {
    pub id: i32,
    pub date: i64,
    pub odometer: f64,
    pub amount: f64,
    pub cost: f64
}
