'use server';

import { FuelLog, FuelLogOverview, getFuelLogOverview } from '@/models/FuelLog';

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

export async function getFuelLogs(
  limit?: number,
  offset?: number,
): Promise<FuelLogOverview[]> {
  return templateLogs
    .map((log) => getFuelLogOverview(log))
    .filter((log) => log !== undefined) as FuelLogOverview[];
}

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

export async function saveFuelLogs(logs: FuelLog[]) {
  const convertedLogs: StorableFuelLog[] = templateLogs.map((elem) =>
    fuelLogToStorable(elem),
  );
  //FIXME: putMany will crash with more than 25 elems
  return fuelDB.putMany(convertedLogs);
}
