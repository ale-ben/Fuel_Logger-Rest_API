use diesel::{data_types::PgTimestamp, prelude::*};

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::database::schema::fuellogs)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct PGFuelLog {
    pub id: i32,
    pub odometer: f32,
    pub flagged: bool,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::database::schema::fuelentries)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct PGFuelEntry {
    pub id: i32,
    pub date: PgTimestamp,
    pub amount: f32,
    pub cost: f32,
    pub fuellog: i32,
}