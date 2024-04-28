-- Your SQL goes here
create table public.FuelLogs (
		id       integer not null
		constraint FuelLogs_pk
		primary key,
	odometer FLOAT   not null,
	flagged  BOOLEAN not null
);