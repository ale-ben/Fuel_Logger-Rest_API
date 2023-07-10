import React from "react";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import { FuelLog, Actions } from "../models/StateModel";


interface Props {
	fuelLog: FuelLog;
	dispatch: React.Dispatch<Actions>;
}

const SingleDataPoint = ({fuelLog, dispatch}: Props) => {
	return (
		<div
			className="m-2 px-6 pt-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col">
			<div className="flex flex-col">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${fuelLog.date.getDate()}/${fuelLog.date.getMonth()}/${fuelLog.date.getFullYear()} - ${fuelLog.date.getHours()}:${fuelLog.date.getMinutes()}`}</h5>
				<div className="flex flex-row justify-evenly">
					<p className="text-right">{fuelLog.odometer}</p>
					<p className="text-left">Km</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p className="text-right">{fuelLog.liters}</p>
					<p>L</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p className="text-right">{fuelLog.price}</p>
					<p>€</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p className="text-right">{fuelLog.price / fuelLog.liters}</p>
					<p>€/L</p>
				</div>
			</div>
			<div className="flex flex-row pt-4 pb-2 justify-evenly">
				<span className="icon">
					<AiFillEdit size="1.5em"/>
				</span>
				<span className="icon">
					<AiFillDelete size="1.5em" color="red"/>
				</span>
			</div>
		</div>
	);
};

export default SingleDataPoint;
