export interface FuelEntry {
	id: number;
	date: number;
	amount: number;
	price: number;
}

export interface FuelLog {
	id: number;
	mileage: number;
	entries: FuelEntry[];
}

export const DummyLogs: FuelLog[] = [
	{
		id: 0,
		mileage: 561.1,
		entries: [
			{
				id: 0,
				date: new Date('2023-06-24').getTime(),
				amount: 33.19,
				price: 60.37
			}
		]
	},
	{
		id: 1,
		mileage: 572.7,
		entries: [
			{
				id: 0,
				date: new Date('2023-07-21').getTime(),
				amount: 32.84,
				price: 60.72
			},
			{
				id: 1,
				date: new Date('2023-07-23').getTime(),
				amount: 12.84,
				price: 22.72
			}
		]
	},
	{
		id: 2,
		mileage: 523.1,
		entries: [
			{
				id: 0,
				date: new Date('2023-08-27').getTime(),
				amount: 33.42,
				price: 63.46
			}
		]
	},
	{
		id: 3,
		mileage: -1,
		entries: [
			{
				id: 0,
				date: new Date('2023-09-08').getTime(),
				amount: 12.05,
				price: 23.24
			}
		]
	}
];
