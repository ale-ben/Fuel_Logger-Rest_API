'use server';

import { Deta } from 'deta';
import { ObjectType } from 'deta/dist/types/types/basic';
import { DateRange } from 'react-day-picker';
import { FuelLog, zFuelLog, zFuelLogArray } from './FuelLog';

const deta = Deta();
const fuelDB = deta.Base('fuel');

export async function getFuelLogs(
	range?: DateRange
): Promise<FuelLog[] | undefined> {
	// Fetch logs from Deta
	const res = await fuelDB.fetch();

	// Check if the response is valid and parse it to FuelLog[]
	const parsedLogs = zFuelLogArray.safeParse(res.items);

	// If parsing failed, return undefined
	if (!parsedLogs.success) return undefined;

	// If a range is specified, filter the logs
	if (
		range !== undefined &&
		range.from !== undefined &&
		range.to !== undefined
	) {
		return parsedLogs.data.filter((log) => {
			// If we find at least one entry with the specified date range, return true
			for (const entry of log.entries) {
				if (
					entry.date >= range.from!.getTime() &&
					entry.date <= range.to!.getTime()
				)
					return true;
			}
			return false;
		});
	}

	// If no range is specified, return all logs
	return parsedLogs.data;
}

export async function getFuelLog(key: string): Promise<FuelLog | undefined> {
	const res = await fuelDB.get(key);

	const parsedLog = zFuelLog.safeParse(res);

	if (!parsedLog.success) return undefined;
	else return parsedLog.data;
}

export async function saveFuelLog(log: FuelLog): Promise<void> {
	await fuelDB.put(log as unknown as ObjectType);
}

export async function deleteFuelLog(key: string): Promise<void> {
	await fuelDB.delete(key);
}
