export interface FuelLog {
	id: number;
	date: Date;
	odometer: number;
	liters: number;
	price: number;
}

export interface StateModel {
	fuelLogs: FuelLog[];
	inputBox: string;
}

export type Actions = {
	type: "PARSE";
	payload: string;
} | {
	type: "REMOVE";
	payload: number;
}

export const reducer = (state: StateModel, action: Actions): StateModel => {
	switch (action.type) {
		case "PARSE":
			console.log(action.payload);
			return state;
		case "REMOVE":
			console.log(action.payload);
			return state;
		default:
			throw new Error();
	}
}