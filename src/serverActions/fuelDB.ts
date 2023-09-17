'use server';

import { FuelLog, FuelLogOverview, getFuelLogOverview } from '@/models/FuelLog';

import { Deta } from 'deta'; // import Deta
import Base from 'deta/dist/types/base';
import { FetchResponse } from 'deta/dist/types/types/base/response';
import { getSettings } from './settingsDB';

// Initialize deta client
const deta = Deta();

// Select the database
let fuelDB: Base = deta.Base('fuelDB'); // Default database

type StorableFuelEntry = {
  date: number;
  liters: number;
  price: number;
};

type StorableFuelLog = {
  key?: string;
  mileage: number;
  entries: StorableFuelEntry[];
};

const templateLogs: FuelLog[] = [
  {
    key: '1',
    mileage: 561.1,
    entries: [
      {
        date: new Date('2023-06-24'),
        liters: 33.19,
        price: 60.37,
      },
    ],
  },
  {
    key: '2',
    mileage: 572.7,
    entries: [
      {
        date: new Date('2023-07-21'),
        liters: 32.84,
        price: 60.72,
      },
      {
        date: new Date('2023-07-23'),
        liters: 12.84,
        price: 22.72,
      },
    ],
  },
  {
    key: '3',
    mileage: 523.1,
    entries: [
      {
        date: new Date('2023-08-27'),
        liters: 33.42,
        price: 63.46,
      },
    ],
  },
  {
    key: '4',
    mileage: -1,
    entries: [
      {
        date: new Date('2023-09-08'),
        liters: 12.05,
        price: 23.24,
      },
    ],
  },
];

/**
 * Convert a FuelLog to a StorableFuelLog
 * @param log The FuelLog to convert
 * @returns A StorableFuelLog
 */
function fuelLogToStorable(log: FuelLog): StorableFuelLog {
  return {
    ...log,
    entries: log.entries.map((elem) => {
      return {
        ...elem,
        date: elem.date.getTime(),
      };
    }),
  };
}

/**
 * Convert a StorableFuelLog to a FuelLog
 * @param storableLog The StorableFuelLog to convert
 * @returns A FuelLog
 */
function storableToFuelLog(storableLog: StorableFuelLog): FuelLog {
  return {
    ...storableLog,
    entries: storableLog.entries.map((elem) => {
      return {
        ...elem,
        date: new Date(elem.date),
      };
    }),
  };
}

/**
 * Check if an object is a StorableFuelLogEntry
 * @param obj The object to check
 * @returns True if the object is a StorableFuelLogEntry, false otherwise
 */
function isStorableFuelLogEntry(obj: any): obj is StorableFuelEntry {
  const checkObj = obj !== undefined;
  const checkDate = Number.isFinite(obj.date);
  const checkLiters = Number.isFinite(obj.liters);
  const checkPrice = Number.isFinite(obj.price);
  if (checkObj && checkDate && checkLiters && checkPrice) {
    return true;
  } else {
    console.log(`Invalid storable fuel log entry ${JSON.stringify(obj)}
	  obj: ${checkObj}
	  Number.isFinite(obj.date): ${checkDate}
	  Number.isFinite(obj.liters): ${checkLiters}
	  Number.isFinite(obj.price): ${checkPrice}
		`);
    return false;
  }
}

/**
 * Check if an object is a StorableFuelLog
 * @param obj The object to check
 * @returns True if the object is a StorableFuelLog, false otherwise
 */
function isStorableFuelLog(obj: any): obj is StorableFuelLog {
  const checkObj = obj !== undefined;
  const checkMileage = Number.isFinite(obj.mileage);
  const checkEntries = obj.entries !== undefined;
  const checkEntriesArray = obj.entries instanceof Array;
  const checkEntriesEvery =
    obj.entries &&
    obj.entries instanceof Array &&
    obj.entries.every(isStorableFuelLogEntry);
  if (
    checkObj &&
    checkMileage &&
    checkEntries &&
    checkEntriesArray &&
    checkEntriesEvery
  ) {
    return true;
  } else {
    console.log(`Invalid storable fuel log ${JSON.stringify(obj)}
	  obj: ${checkObj}
	  Number.isFinite(obj.mileage): ${checkMileage}
	  obj.entries: ${checkEntries}
	  obj.entries instanceof Array: ${checkEntriesArray}
	  obj.entries.every(isFuelLogEntry): ${checkEntriesEvery}`);
    return false;
  }
}

/**
 * Get a list of fuel logs from the database
 * @param limit Optional limit of logs to fetch
 * @param lastKey Optional Key of the last seen element, needed for pagination
 * @returns A list of fuel log overviews or undefined if no logs are found
 */
export async function getFuelLogs(
  limit?: number,
  lastKey?: string,
): Promise<FuelLogOverview[] | undefined> {
  // Fetch the data

  let logs: FetchResponse;
  if (limit && lastKey) logs = await fuelDB.fetch({}, { limit, last: lastKey });
  else if (limit) logs = await fuelDB.fetch({}, { limit });
  else if (lastKey) logs = await fuelDB.fetch({}, { last: lastKey });
  else logs = await fuelDB.fetch({});

  // If no logs are found, return undefined
  if (logs.count === 0) return undefined;
  // Convert the logs to (FuelLog | undefined)[]
  const convertedLogs: (FuelLog | undefined)[] = logs.items.map((elem) => {
    if (isStorableFuelLog(elem)) return storableToFuelLog(elem);
    else undefined;
  });

  // Filter out undefined logs and convert them to FuelLogOverview
  return convertedLogs
    .filter((elem) => elem !== undefined)
    .map((elem) => getFuelLogOverview(elem as FuelLog)) as FuelLogOverview[];
}

/**
 * Get a fuel log from the database
 * @param key The key of the fuel log to fetch
 * @returns A fuel log or undefined if no log is found
 */
export async function getFuelLog(key: string): Promise<FuelLog | undefined> {
  const log = await fuelDB.get(key);
  if (isStorableFuelLog(log)) return storableToFuelLog(log);
  else return undefined;
}

export async function saveFuelLogs(logs: FuelLog[]) {
  // Convert the logs to StorableFuelLog
  const convertedLogs: StorableFuelLog[] = logs.map((elem) =>
    fuelLogToStorable(elem),
  );

  if (convertedLogs.length === 0) return;
  if (convertedLogs.length < 25) {
    await fuelDB.putMany(convertedLogs);
  } else {
    let i = 0;
    while (i < convertedLogs.length) {
      await fuelDB.putMany(convertedLogs.slice(i, i + 25));
      i += 25;
    }
  }
}

/**
 * Delete a fuel log from the database
 * @param key The key of the fuel log to delete
 */
export async function deleteFuelLog(key: string) {
  await fuelDB.delete(key);
}

/**
 * Align fuel db settings with settings db
 */
export async function updateFuelDBSettings() {
  const settings = await getSettings();
  fuelDB = deta.Base(settings.currentDB);
}

updateFuelDBSettings();
