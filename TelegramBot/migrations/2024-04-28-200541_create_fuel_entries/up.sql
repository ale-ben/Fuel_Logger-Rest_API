-- Your SQL goes here
create table public.FuelEntries (
	id      serial   not null
		constraint FuelEntries_pk
		primary key,
	date    TIMESTAMP not null,
	amount  float4     not null,
	cost    float4     not null,
	FuelLog integer   not null
		constraint FuelLog___fk
		references public.FuelLogs
		on delete cascade
);

