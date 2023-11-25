export interface FuelEntry {
	date: number;
	amount: number;
	price: number;
}

export interface FuelLog {
	odometer: number;
	entries: FuelEntry[];
}

export const DummyLogs: FuelLog[] = [
	{
		odometer: 561.1,
		entries: [
			{
				date: new Date('2023-06-24').getTime(),
				amount: 33.19,
				price: 60.37
			}
		]
	},
	{
		odometer: 572.7,
		entries: [
			{
				date: new Date('2023-07-21').getTime(),
				amount: 32.84,
				price: 60.72
			},
			{
				date: new Date('2023-07-23').getTime(),
				amount: 12.84,
				price: 22.72
			}
		]
	},
	{
		odometer: 523.1,
		entries: [
			{
				date: new Date('2023-08-27').getTime(),
				amount: 33.42,
				price: 63.46
			}
		]
	},
	{
		odometer: -1,
		entries: [
			{
				date: new Date('2023-09-08').getTime(),
				amount: 12.05,
				price: 23.24
			}
		]
	}
];

export function GetDate(log: FuelLog): Date {
	return new Date(log.entries[0].date);
}

export function GetAmount(log: FuelLog): number {
	return log.entries.reduce((sum, entry) => sum + entry.amount, 0);
}

export function GetPrice(log: FuelLog): number {
	return log.entries.reduce((sum, entry) => sum + entry.price, 0);
}

// Type Guards
function IsFuelEntry(obj: unknown): obj is FuelEntry {
	const tmpObj = obj as FuelEntry;

	if (tmpObj.date === undefined || typeof tmpObj.date !== 'number') {
		return false;
	}

	if (tmpObj.amount === undefined || typeof tmpObj.amount !== 'number') {
		return false;
	}

	if (tmpObj.price === undefined || typeof tmpObj.price !== 'number') {
		return false;
	}

	return true;
}

export function IsFuelLog(obj: unknown): obj is FuelLog {
	const tmpObj = obj as FuelLog;

	if (tmpObj.odometer === undefined || typeof tmpObj.odometer !== 'number') {
		return false;
	}

	if (tmpObj.entries === undefined || !Array.isArray(tmpObj.entries)) {
		return false;
	}

	tmpObj.entries.forEach((entry) => {
		if (!IsFuelEntry(entry)) {
			return false;
		}
	});

	return true;
}

export function IsFuelLogArray(obj: unknown): obj is FuelLog[] {
	if (!Array.isArray(obj)) {
		return false;
	}

	obj.forEach((log) => {
		if (!IsFuelLog(log)) {
			return false;
		}
	});

	return true;
}
