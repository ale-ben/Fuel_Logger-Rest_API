'use server';

import {
  FuelLog,
  FuelLogOverview,
  getFuelLogOverview,
  isFuelLog,
} from '@/models/FuelLog';

import { Deta } from 'deta'; // import Deta

const deta = Deta();
const fuelDB = deta.Base('fuelDB');

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

export async function getFuelLogs(
  limit?: number,
  offset?: number,
): Promise<FuelLogOverview[] | undefined> {
  const logs = await fuelDB.fetch();
  if (logs.count === 0) return undefined;
  const convertedLogs = logs.items.map((elem) => {
    if (isStorableFuelLog(elem)) return storableToFuelLog(elem);
    else {
      console.log('Invalid fuel log ' + JSON.stringify(elem));
      undefined;
    }
  });
  return convertedLogs.filter((elem) => elem !== undefined).map((elem) => getFuelLogOverview(elem as FuelLog)) as FuelLogOverview[];
}

export async function saveFuelLogs(logs: FuelLog[]) {
  const convertedLogs: StorableFuelLog[] = templateLogs.map((elem) =>
    fuelLogToStorable(elem),
  );
  //FIXME: putMany will crash with more than 25 elems
  return fuelDB.putMany(convertedLogs);
}
