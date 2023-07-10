import React from "react";
import { Actions, StateModel } from "../models/StateModel";

interface Props{
	state: StateModel;
	dispatch: React.Dispatch<Actions>;
}
const InputField = ({state, dispatch}: Props) => {
	const [inputValue, setInputValue] = React.useState<string>("");

	return (
		<div className="p-5 w-1/3 flex flex-col">
			<textarea
				rows={25}
				className="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Inserisci i dati"
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				value={inputValue}></textarea>
			<div className="flex flex-row pt-5 mb-2">
				<button
					type="button"
					className="mr-2 py-2.5 px-5 w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					onClick={() => {
						setInputValue("");
						dispatch({type: "CLEAR"});
						}}>
					Clear
				</button>
				<button
					type="button"
					className="ml-2 py-2.5 px-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					onClick={() => {
						dispatch({type: "PARSE", payload: inputValue});
					}}>
					Parse
				</button>
			</div>

			<button
					type="button"
					className="mt-2 py-2.5 px-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:dark:bg-blue-500"
					disabled={state.fuelLogs.length == 0}>
					Export
			</button>
		</div>
	);
};

export default InputField;
