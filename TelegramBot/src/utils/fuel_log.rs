use diesel::data_types::PgTimestamp;
use time::OffsetDateTime;

use crate::database::models::{PGFuelEntry, PGFuelLog};

pub struct FuelEntry {
    pub date: OffsetDateTime,
    pub amount: f32,
    pub cost: f32,
}

pub struct FuelLog {
    pub odometer: f32,
    is_flagged: bool,
    pub entries: Vec<FuelEntry>,
}

impl FuelEntry {
    pub fn new() -> Self {
        Self {
            date: OffsetDateTime::now_utc(),
            amount: 0_f32,
            cost: 0_f32,
        }
    }

    pub fn as_pg_fuel_entry(self, log_id: i32) -> PGFuelEntry {
        PGFuelEntry {
            id: -1,
            date: PgTimestamp(self.date.unix_timestamp()),
            amount: self.amount,
            cost: self.cost,
            fuellog: log_id,
        }
    }

    pub fn from_pg_fuel_entry(fuel_entry: PGFuelEntry) -> Result<Self, ()> {
        if let Ok(date) = OffsetDateTime::from_unix_timestamp(fuel_entry.date.0) {
            Ok(Self {
                date,
                amount: fuel_entry.amount,
                cost: fuel_entry.cost,
            })
        } else {
            error!("Unable to parse timestamp {}", fuel_entry.date.0);
            Err(())
        }
    }
}

impl FuelLog {
    pub fn new() -> Self {
        Self {
            odometer: 0_f32,
            is_flagged: true,
            entries: vec![FuelEntry::new()],
        }
    }

    pub fn as_pg_fuel_log(self) -> PGFuelLog {
        PGFuelLog {
            id: -1,
            odometer: self.odometer,
            flagged: self.is_flagged,
        }
    }

    pub fn from_pg_fuel_log(fuel_log: PGFuelLog) -> Self {
        Self {
            odometer: fuel_log.odometer,
            is_flagged: fuel_log.flagged,
            entries: vec![],
        }
    }
}
