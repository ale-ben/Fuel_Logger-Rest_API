use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;

use crate::database::models::{FuelEntry, FuelLog, NewFuelEntry};

use super::models::NewCompleteLog;

pub struct DB {
    connection: PgConnection,
}

impl DB {
    pub fn establish_connection() -> DB {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        DB {
            connection: PgConnection::establish(&database_url)
                .unwrap_or_else(|_| panic!("Error connecting to {}", database_url)),
        }
    }

    pub fn save_log(&mut self, complete_log: NewCompleteLog) -> bool {
		debug!("Saving log");
        use crate::database::schema::fuelentries;
        use crate::database::schema::fuellogs;

        let fuel_log_res: FuelLog = diesel::insert_into(fuellogs::table)
            .values(complete_log.log)
            .returning(FuelLog::as_returning())
            .get_result(&mut self.connection)
            .expect("Error saving new log");

			// TODO: Error handling
        for entry in complete_log.entries {
            let tmp_entry = NewFuelEntry {
                fuellog: &fuel_log_res.id,
                ..entry
            };

            diesel::insert_into(fuelentries::table)
                .values(tmp_entry)
                .returning(FuelEntry::as_returning())
                .get_result(&mut self.connection)
                .expect("Error saving new entries");
			// TODO: Error handling
        }

		info!("Log saved");

        true
    }
}
