import {FuelLog} from "./FuelLog";

export interface StateModel {
	fuelLogs: FuelLog[];
}

export type Actions = |{
	type: "PARSE";
	payload: string;
} | {
	type: "REMOVE";
	payload: number;
} | {
	type: "CLEAR";
} | {
	type: "EXPORT";
} | {
	type: "EDIT";
	payload: FuelLog;
};

export const reducer = (state : StateModel, action : Actions): StateModel => {
	switch (action.type) {
		case "PARSE":
			console.warn("ACTION NOT IMPLEMENTED");
			console.log(action.payload);
			return state;
		case "REMOVE":
			console.debug("Deleting", state.fuelLogs.filter((fuelLog) => fuelLog.id === action.payload));
			return {
				...state,
				fuelLogs: state.fuelLogs.filter((fuelLog) => fuelLog.id !== action.payload)
			};
		case "CLEAR":
			console.log("Clearing fuel logs");
			return {
				...state,
				fuelLogs: []
			};
		case "EXPORT":
			console.warn("ACTION NOT IMPLEMENTED");
			console.log("Export");
			return state;
		case "EDIT":
			console.log("Editing", action.payload);
			return {
				...state,
				fuelLogs: state.fuelLogs.map((fuelLog) => (
					fuelLog.id === action.payload.id
						? action.payload
						: fuelLog
				))
			};
		default:
			throw new Error();
	}
};
