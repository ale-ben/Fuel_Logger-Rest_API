import { FuelLogOverview } from '@/models/FuelLog';
import Link from 'next/link';

interface Props {
  element: FuelLogOverview;
}

const LogElement = ({ element }: Props) => {
  return (
    <Link
      href={'/logs/' + element.key}
      className="flex w-48 flex-col items-center justify-between rounded border-2 bg-gray-100 px-4 py-3 text-slate-600 transition-all ease-in-out hover:cursor-pointer"
    >
      <div className="text-xl">
        {element.date.getDate()}/{element.date.getMonth()}/
        {element.date.getFullYear()}
      </div>
      <div>{element.mileage.toFixed(2)} km</div>
      <div>{element.liters.toFixed(2)} L</div>
      <div>{element.price.toFixed(2)} €</div>
    </Link>
  );
};

export default LogElement;
