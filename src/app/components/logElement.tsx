import { FuelLogOverview } from '@/models/FuelLog';
import Link from 'next/link';

interface Props {
  element: FuelLogOverview;
}

const LogElement = ({ element }: Props) => {
  return (
    <Link
      href={'/logs/' + element.id}
      className="flex w-48 flex-col items-center justify-between rounded border-2 bg-gray-100 px-4 py-3 text-slate-600 transition-all ease-in-out hover:cursor-pointer"
    >
      <div className="text-xl">
        {element.date.getDate()}/{element.date.getMonth()}/
        {element.date.getFullYear()}
      </div>
      <div>{element.mileage} km</div>
      <div>{element.liters} L</div>
      <div>{element.price} €</div>
    </Link>
  );
};

export default LogElement;
