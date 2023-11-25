import { FuelLog, GetAmount, GetDate, GetPrice } from '@/models/FuelLog';
import { Card, CardHeader } from '@nextui-org/card';

interface SingleLogProps {
	log: FuelLog;
}

const SingleLog = ({ log }: SingleLogProps) => {
	return (
		<Card>
			<CardHeader>{GetDate(log).toDateString()}</CardHeader>
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
		</Card>
	);
};

export default SingleLog;
