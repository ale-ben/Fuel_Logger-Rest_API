import { FuelEntry, FuelLog, defaultFuelLog } from './FuelLog';

interface FuelLogModalReducerState {
	isModalOpen: boolean;
	fuelLog: FuelLog;
}

export const defaultFuelLogModalState: FuelLogModalReducerState = {
	isModalOpen: false,
	fuelLog: defaultFuelLog
};

type FuelLogModalReducerAction =
	| {
			type: 'OPEN_MODAL';
			payload?: FuelLog;
	  }
	| {
			type: 'CLOSE_MODAL';
	  }
	| {
			type: 'SET_FUEL_LOG';
			payload: FuelLog;
	  }
	| {
			type: 'UPDATE_ODOMETER';
			payload: number;
	  }
	| {
			type: 'ADD_ENTRY';
			payload: FuelEntry;
	  }
	| {
			type: 'UPDATE_ENTRY';
			payload: { index: number; entry: FuelEntry };
	  }
	| {
			type: 'REMOVE_ENTRY';
			payload: number;
	  };

export function FuelLogModalReducer(
	state: FuelLogModalReducerState,
	action: FuelLogModalReducerAction
): FuelLogModalReducerState {
	switch (action.type) {
		case 'OPEN_MODAL':
			if (action.payload) {
				return {
					...state,
					isModalOpen: true,
					fuelLog: action.payload
				};
			} else {
				return {
					...state,
					isModalOpen: true
				};
			}
		case 'CLOSE_MODAL':
			return {
				...state,
				isModalOpen: false
			};
		case 'SET_FUEL_LOG':
			return {
				...state,
				fuelLog: action.payload
			};
		case 'UPDATE_ODOMETER':
			return {
				...state,
				fuelLog: {
					...state.fuelLog,
					odometer: action.payload
				}
			};
		case 'ADD_ENTRY':
			return {
				...state,
				fuelLog: {
					...state.fuelLog,
					entries: [...state.fuelLog.entries, action.payload]
				}
			};
		case 'UPDATE_ENTRY':
			return {
				...state,
				fuelLog: {
					...state.fuelLog,
					entries: state.fuelLog.entries.map((entry, index) => {
						if (index === action.payload.index) {
							return action.payload.entry;
						}

						return entry;
					})
				}
			};
		case 'REMOVE_ENTRY':
			return {
				...state,
				fuelLog: {
					...state.fuelLog,
					entries: state.fuelLog.entries.filter(
						(_, index) => index !== action.payload
					)
				}
			};
		default:
			return state;
	}
}
