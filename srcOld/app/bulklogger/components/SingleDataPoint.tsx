import React from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import { Actions } from '@/models/BulkInputStateModel';
import { FuelLog } from '@/models/FuelLog';

interface Props {
  fuelLog: FuelLog;
  dispatch: React.Dispatch<Actions>;
}

const SingleDataPoint = ({ fuelLog, dispatch }: Props) => {
  const [editFuelLog, setEditFuelLog] = React.useState<FuelLog>(fuelLog);

  return (
    <div className="m-2 flex flex-col rounded-lg border border-gray-200 bg-white px-6 pt-2 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col">
        <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${fuelLog.date.getDate()}/${fuelLog.date.getMonth()}/${fuelLog.date.getFullYear()}`}</h5>
        <div className="grid grid-cols-2 gap-x-3">
          <p className="text-right">{fuelLog.odometer.toFixed(1)}</p>
          <p className="">Km</p>
          <p className="text-right">{fuelLog.liters.toFixed(2)}</p>
          <p>L</p>
          <p className="text-right">{fuelLog.price.toFixed(2)}</p>
          <p>€</p>
          <p className="text-right">
            {(fuelLog.price / fuelLog.liters).toFixed(3)}
          </p>
          <p>€/L</p>
        </div>
      </div>
      <div className="flex justify-evenly pb-2 pt-4">
        <button
          type="button"
          className="hover:scale-150 hover:cursor-pointer"
          onClick={() => {
            dispatch({ type: 'REMOVE', payload: fuelLog.id });
          }}
        >
          <AiFillDelete size="1.5em" color="red" />
        </button>
      </div>
    </div>
  );
};

export default SingleDataPoint;
