use time::OffsetDateTime;

pub struct FuelEntry{
	pub date: OffsetDateTime,
	pub amount: f32,
	pub cost: f32,
}

pub struct FuelLog {
	pub odometer: f32,
	is_flagged: bool,
	pub entries: Vec<FuelEntry>
}

impl FuelEntry {
	pub fn new() -> Self {
		Self {
			date: OffsetDateTime::now_utc(),
			amount: 0_f32,
			cost: 0_f32,
		}
	}
}

impl FuelLog {
	pub fn new() -> Self {
		Self {
			odometer: 0_f32,
			is_flagged: true,
			entries: vec![FuelEntry::new()]
		}
	}
}
