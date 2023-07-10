import React from 'react'
import SingleDataPoint from './SingleDataPoint'
import { Actions } from '../models/StateModel';
import { FuelLog } from '../models/FuelLog';

interface Props {
	  fuelLogs: FuelLog[];
	  dispatch: React.Dispatch<Actions>;
}

const OutputBox = ({fuelLogs, dispatch}: Props) => {
  return (
	<div className='p-5 w-2/3 max-h-full h-full'>
		<div className="bg-[#f9fafb] rounded-lg grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-h-full  min-h-[5rem] overflow-scroll">
			{
				fuelLogs.map((fuelLog) => (
					<SingleDataPoint key={fuelLog.id} fuelLog={fuelLog} dispatch={dispatch}/>
				))
			}
		</div>
	</div>
  )
}

export default OutputBox