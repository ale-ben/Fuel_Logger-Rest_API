import { z } from 'zod';

export interface FuelEntry {
	date: number;
	amount: number;
	price: number;
}

export interface FuelLog {
	key?: string;
	odometer: number;
	entries: FuelEntry[];
}

export const defaultFuelEntry: FuelEntry = {
	date: new Date().getTime(),
	amount: 0,
	price: 0
};

export const defaultFuelLog: FuelLog = {
	odometer: 0,
	entries: [defaultFuelEntry]
};

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

export const LongDummyLogs: FuelLog[] = [
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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
	},
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

// Type parsing using zod
export const zFuelEntry = z.object({
	date: z.number(),
	amount: z.number(),
	price: z.number()
});

export const zFuelLog = z.object({
	key: z.string().optional(),
	odometer: z.number(),
	entries: z.array(zFuelEntry)
});

export const zFuelLogArray = z.array(zFuelLog);
