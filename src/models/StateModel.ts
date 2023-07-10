import { FuelLog } from "./FuelLog";

export interface StateModel {
	fuelLogs: FuelLog[];
}

export type Actions = {
	type: "PARSE";
	payload: string;
} | {
	type: "REMOVE";
	payload: number;
} | {
	type: "CLEAR";
} | {
	type: "EXPORT";
}

export const reducer = (state: StateModel, action: Actions): StateModel => {
	switch (action.type) {
		case "PARSE":
			console.warn("ACTION NOT IMPLEMENTED");
			console.log(action.payload);
			return state;
		case "REMOVE":
			console.warn("ACTION NOT IMPLEMENTED");
			console.log(action.payload);
			return state;
		case "CLEAR":
			console.log("Clearing fuel logs");
			return {...state, fuelLogs: []}
		case "EXPORT":
			console.warn("ACTION NOT IMPLEMENTED");
			console.log("Export");
			return state;
		default:
			throw new Error();
	}
}