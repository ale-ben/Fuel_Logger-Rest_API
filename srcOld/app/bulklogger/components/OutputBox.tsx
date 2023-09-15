import React from 'react';

import SingleDataPoint from './SingleDataPoint';
import { Actions, BulkInputStateModel } from '@/models/BulkInputStateModel';

interface Props {
  state: BulkInputStateModel;
  dispatch: React.Dispatch<Actions>;
}

const OutputBox = ({ state, dispatch }: Props) => {
  return (
    <div className="ml-2 max-h-full w-2/3">
      <div className="grid max-h-full min-h-[5rem] grid-cols-1 overflow-scroll rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {state.fuelLogs
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((fuelLog) => (
            <SingleDataPoint
              key={fuelLog.id}
              fuelLog={fuelLog}
              dispatch={dispatch}
            />
          ))}
      </div>
    </div>
  );
};

export default OutputBox;
