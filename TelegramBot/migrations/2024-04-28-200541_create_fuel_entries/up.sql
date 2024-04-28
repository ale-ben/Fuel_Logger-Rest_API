-- Your SQL goes here
create table public.FuelEntries (
	id      integer   not null
		constraint FuelEntries_pk
		primary key,
	date    TIMESTAMP not null,
	amount  float     not null,
	cost    FLOAT     not null,
	FuelLog integer   not null
		constraint FuelLog___fk
		references public.FuelLogs
		on delete cascade
);

