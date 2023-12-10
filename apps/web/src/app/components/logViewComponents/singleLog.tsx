import { FuelLog, GetAmount, GetDate, GetPrice } from '@/models/FuelLog';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import SingleLogOptions from './singleLogOptions';

interface SingleLogProps {
	log: FuelLog;
}

const SingleLog = ({ log }: SingleLogProps) => {
	return (
		<Card className="w-40">
			<CardHeader className="flex justify-center">
				{GetDate(log).toDateString()}
			</CardHeader>
			<div className="flex flex-col px-3 pb-3">
				<div className="flex flex-row justify-evenly">
					<p>Km</p>
					<p>{log.odometer.toFixed(2)}</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p>L</p>
					<p>{GetAmount(log).toFixed(2)}</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p>€</p>
					<p>{GetPrice(log).toFixed(2)}</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p>€/L</p>
					<p>{(GetPrice(log) / GetAmount(log)).toFixed(2)}</p>
				</div>
			</div>
			<CardFooter>
				<SingleLogOptions log={log} />
			</CardFooter>
		</Card>
	);
};

export default SingleLog;
