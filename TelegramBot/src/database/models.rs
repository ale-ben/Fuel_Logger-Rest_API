use diesel::prelude::*;
use time::{OffsetDateTime, PrimitiveDateTime};

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::database::schema::fuellogs)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct FuelLog {
    pub id: i32,
    pub odometer: f32,
    pub flagged: bool,
}

impl FuelLog {
    pub fn new() -> Self {
        Self {
            id: -1,
            odometer: 0_f32,
            flagged: true,
        }
    }

    pub fn to_new_fuel_log(&self) -> NewFuelLog {
        NewFuelLog {
            odometer: &self.odometer,
            flagged: &self.flagged,
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = crate::database::schema::fuellogs)]
pub struct NewFuelLog<'a> {
    pub odometer: &'a f32,
    pub flagged: &'a bool,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::database::schema::fuelentries)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct FuelEntry {
    pub id: i32,
    pub date: PrimitiveDateTime,
    pub amount: f32,
    pub cost: f32,
    pub fuellog: i32,
}

impl FuelEntry {
    pub fn new() -> Self {
		let now_odt = OffsetDateTime::now_utc();

        Self {
            id: -1,
            date: PrimitiveDateTime::new(now_odt.date(), now_odt.time()),
            amount: 0_f32,
            cost: 0_f32,
            fuellog: -1,
        }
    }

    pub fn to_new_fuel_entry(&self) -> NewFuelEntry {
        NewFuelEntry {
            date: &self.date,
            amount: &self.amount,
            cost: &self.cost,
            fuellog: &self.fuellog,
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = crate::database::schema::fuelentries)]
pub struct NewFuelEntry<'a> {
    pub date: &'a PrimitiveDateTime,
    pub amount: &'a f32,
    pub cost: &'a f32,
    pub fuellog: &'a i32,
}

pub struct CompleteLog {
    pub log: FuelLog,
    pub entries: Vec<FuelEntry>,
}

pub struct NewCompleteLog<'a> {
    pub log: NewFuelLog<'a>,
    pub entries: Vec<NewFuelEntry<'a>>,
}
