import React from 'react';
import { Actions, BulkInputStateModel } from '@/models/BulkInputStateModel';

interface Props {
  state: BulkInputStateModel;
  dispatch: React.Dispatch<Actions>;
}
const InputField = ({ state, dispatch }: Props) => {
  return (
    <div className="mr-2 flex w-1/3 flex-col">
      <textarea
        rows={25}
        className="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Inserisci i dati"
        onChange={(e) => {
          dispatch({ type: 'INPUT', payload: e.target.value });
        }}
        value={state.inputBox}
      ></textarea>
      <div className="mb-2 flex flex-row pt-5">
        <button
          type="button"
          className="mr-2 w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => dispatch({ type: 'CLEAR' })}
        >
          Clear
        </button>
        <button
          type="button"
          className="ml-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            dispatch({ type: 'PARSE' });
          }}
        >
          Parse
        </button>
      </div>

      <button
        type="button"
        className="mt-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:dark:bg-blue-500"
        disabled={state.fuelLogs.length === 0}
      >
        Save
      </button>
    </div>
  );
};

export default InputField;
