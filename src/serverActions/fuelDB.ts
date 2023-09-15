'use server';

import { FuelLog } from "@/models/FuelLog";

const templateLogs : FuelLog[] = [
	{
		id: 1,
		mileage: 561.1,
		entries: [
			{
				id: 1,
				date: new Date("2023-06-24"),
				liters: 33.19,
				price: 60.37
			}
		]
	}, {
		id: 2,
		mileage: 572.7,
		entries: [
			{
				id: 1,
				date: new Date("2023-07-21"),
				liters: 32.84,
				price: 60.72
			}
		]
	}, {
		id: 3,
		mileage: 523.1,
		entries: [
			{
				id: 1,
				date: new Date("2023-08-27"),
				liters: 33.42,
				price: 63.46
			}
		]
	}, {
		id: 4,
		mileage: -1,
		entries: [
			{
				id: 1,
				date: new Date("2023-09-08"),
				liters: 12.05,
				price: 23.24
			}
		]
	}
];

export async function getFuelLogs(limit?: number, offset?: number): Promise<FuelLog[]> {
	return templateLogs;
}