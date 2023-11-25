'use server';

import { FuelLog, IsFuelLog, IsFuelLogArray } from '@/models/FuelLog';
import { Deta } from 'deta';
import { ObjectType } from 'deta/dist/types/types/basic';

const deta = Deta();
const fuelDB = deta.Base('fuel');

export async function getFuelLogs(): Promise<FuelLog[] | undefined> {
	const res = await fuelDB.fetch({});
	if (res !== undefined && IsFuelLogArray(res.items))
		return res.items as FuelLog[];
	else return undefined;
}

export async function getFuelLog(id: number): Promise<FuelLog | undefined> {
	const res = await fuelDB.get(id.toString());

	if (res !== undefined && IsFuelLog(res)) return res as FuelLog;
	else return undefined;
}

export async function createFuelLog(log: FuelLog): Promise<void> {
	await fuelDB.put(log as unknown as ObjectType);
}
