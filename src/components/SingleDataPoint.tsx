import React from "react";
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {Actions} from "../models/StateModel";
import {FuelLog} from "../models/FuelLog";

interface Props {
	fuelLog: FuelLog;
	dispatch: React.Dispatch<Actions>;
}

const SingleDataPoint = ({fuelLog, dispatch} : Props) => {
	const [edit, setEdit] = React.useState<boolean>(false);
	const [editFuelLog, setEditFuelLog] = React.useState<FuelLog>(fuelLog);

	return (
		<div className="m-2 px-6 pt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
			<div className="flex flex-col">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${fuelLog.date.getDate()}/${fuelLog.date.getMonth()}/${fuelLog.date.getFullYear()} - ${fuelLog.date.getHours()}:${fuelLog.date.getMinutes()}`}</h5>
				<div className="grid grid-cols-2 gap-x-3">
					<p className="text-right">{fuelLog.odometer}</p>
					<p className="">Km</p>
					<p className="text-right">{fuelLog.liters}</p>
					<p>L</p>
					<p className="text-right">{fuelLog.price}</p>
					<p>€</p>
					<p className="text-right">{fuelLog.price / fuelLog.liters}</p>
					<p>€/L</p>
				</div>
			</div>
			<div className="flex flex-row pt-4 pb-2 justify-evenly">
				{
					edit
						? (
							<button
								type="button"
								className="hover:scale-150 hover:cursor-pointer"
								onClick={() => {
									console.debug("Saving edit", editFuelLog);
									setEdit(false);
									dispatch({type: "EDIT", payload: editFuelLog});
								}}>
								<AiOutlineCheck size="1.5em"/>
							</button>
						)
						: (
							<button
								type="button"
								className="hover:scale-150 hover:cursor-pointer"
								onClick={() => {
									console.debug("Editing", fuelLog);
									setEdit(true);
									setEditFuelLog(fuelLog);
									console.warn("ACTION NOT IMPLEMENTED");
								}}>
								<AiFillEdit size="1.5em"/>
							</button>
						)
				}
				<button
					type="button"
					className="hover:scale-150 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
					onClick={() => {
						dispatch({type: "REMOVE", payload: fuelLog.id});
					}}
					disabled={edit}>
					<AiFillDelete size="1.5em" color="red"/>
				</button>
			</div>
		</div>
	);
};

export default SingleDataPoint;
