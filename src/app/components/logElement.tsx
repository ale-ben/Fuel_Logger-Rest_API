import { FuelLog, FuelLogOverview, getFuelLogOverview } from '@/models/FuelLog';

interface Props {
  element: FuelLog;
}

const LogElement = ({ element }: Props) => {
  const elementOverview: FuelLogOverview = getFuelLogOverview(element);
  return <div className='flex flex-col p-3 border-red-200 border-2'>
	<div>
		{elementOverview.date.getDate()}/{elementOverview.date.getMonth()}/{elementOverview.date.getFullYear()}
	</div>
	<div>
		{elementOverview.mileage} km
	</div>
	<div>
		{elementOverview.liters} L
	</div>

  </div>;
};

export default LogElement;
