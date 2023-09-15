export interface FuelEntry {
  id: number;
  date: Date;
  liters: number;
  price: number;
}

export interface FuelLog {
  id: number;
  mileage: number;
  entries: FuelEntry[];
}

export interface FuelLogOverview {
	id: number;
	mileage: number;
	date: Date;
	liters: number;
	price: number;
}

export interface ErrorLog {
  id: number;
  message: string;
  log: string;
  date?: Date;
  mileage?: number;
  liters?: number;
  price?: number;
  priceRate?: number;
}

/**
 * Converts a fuel log to a fuel log overview, aggregating all the fuel entries
 * @param log The fuel log
 * @returns A FuelLogOverview
 */
export function getFuelLogOverview(log: FuelLog): FuelLogOverview {
	return {
		id: log.id,
		mileage: log.mileage,
		date: log.entries[0].date,
		liters: log.entries.map(entry => entry.liters).reduce((a, b) => a + b, 0),
		price: log.entries.map(entry => entry.price).reduce((a, b) => a + b, 0),
	};
}

/**
 * Parse a fuel note
 * @param note
 * @returns A list of fuel logs and a list of errors
 */
/*
export function parseFuelNote(note: string): {
  logs: FuelLog[];
  errors: ErrorLog[];
} {
  const logs = note.split('\n\n').filter((log) => log.trim().length > 0);
  let parseError: ErrorLog[] = [];
  let fuelLogs: FuelLog[] = [];
  let keys: number[] = [];
  logs.forEach((log) => {
    let logRows = log
      .trim()
      .replaceAll(' ', '')
      .replaceAll(',', '.')
      .toLowerCase()
      .split('\n');
    let date: Date | undefined = undefined;
    let odometer: number = -1.0;
    let liters: number = -1.0;
    let price: number = -1.0;
    let priceRate: number = -1.0;
    logRows.forEach((row) => {
      if (row.endsWith('km')) {
        odometer = parseFloat(row.replace('km', ''));
      } else if (row.endsWith('€/l')) {
        priceRate = parseFloat(row.replace('€/l', ''));
      } else if (row.endsWith('l') || row.endsWith('lt')) {
        liters = parseFloat(row.replace('l', '').replace('lt', ''));
      } else if (row.endsWith('€')) {
        price = parseFloat(row.replace('€', ''));
      } else {
        let dateElems = row.split('/');
        if (dateElems.length === 3) {
          try {
            let year = parseInt(dateElems[2]);
            let month = parseInt(dateElems[1]);
            let day = parseInt(dateElems[0]);
            if (
              Number.isNaN(year) ||
              Number.isNaN(month) ||
              Number.isNaN(day)
            ) {
              throw new Error('Unable to parse date');
            }
            date = new Date(year, month, day);
          } catch (error) {
            console.warn('Error parsing date', row, error);
            date = undefined;
          }
        } else {
          console.log('Unknown row', row);
        }
      }
    });

    if (date && odometer > 0 && liters > 0 && price > 0) {
      if (
        priceRate === -1 ||
        priceRate.toPrecision(3) === (price / liters).toPrecision(3)
      ) {
        let key = (date as Date).getTime();
        while (keys.includes(key)) {
          key += 1;
        }
        keys.push(key);
        fuelLogs.push({
          id: key,
          date: date,
          odometer: odometer,
          liters: liters,
          price: price,
        });
      } else {
        console.warn(
          'Wrong fuel price / rate',
          log,
          date,
          odometer,
          liters,
          price,
          priceRate,
          price / liters,
        );
        parseError.push({
          message: 'Wrong fuel price / rate',
          id: parseError.length,
          log: '---- WRONG RATES ----\n' + log,
          date: date,
          odometer: odometer,
          liters: liters,
          price: price,
          priceRate: priceRate,
        });
      }
    } else {
      if (odometer > 0 || liters > 0 || price > 0) {
        let error: ErrorLog = {
          id: parseError.length,
          message:
            (date ? '' : '- Missing date') +
            (odometer > 0 ? '' : ' - Missing odometer') +
            (liters > 0 ? '' : ' - Missing liters') +
            (price > 0 ? '' : ' - Missing price'),
          log: log,
          date: date,
          odometer: odometer,
          liters: liters,
          price: price,
          priceRate: priceRate,
        };
        parseError.push(error);
        console.warn('Error parsing log', error);
      } else {
        console.debug('Ignored log', log);
      }
    }
  });

  return { logs: fuelLogs, errors: parseError };
}

*/
