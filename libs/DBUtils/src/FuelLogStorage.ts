'use server';

import { Deta } from 'deta';
import { ObjectType } from 'deta/dist/types/types/basic';
import { FuelLog, IsFuelLog, IsFuelLogArray } from './FuelLog';

const deta = Deta();
const fuelDB = deta.Base('fuel');

export async function getFuelLogs(): Promise<FuelLog[] | undefined> {
	const res = await fuelDB.fetch({});
	if (res !== undefined && IsFuelLogArray(res.items))
		return res.items as FuelLog[];
	else return undefined;
}

export async function getFuelLog(key: string): Promise<FuelLog | undefined> {
	const res = await fuelDB.get(key);

	if (res !== undefined && IsFuelLog(res)) return res as FuelLog;
	else return undefined;
}

export async function saveFuelLog(log: FuelLog): Promise<void> {
	await fuelDB.put(log as unknown as ObjectType);
}

export async function deleteFuelLog(key: string): Promise<void> {
	await fuelDB.delete(key);
}
