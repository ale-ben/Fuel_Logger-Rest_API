import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { FuelLog, GetAmount, GetDate, GetPrice } from '@fuel-logger/dbutils';
import SingleLogOptions from './singleLogOptions';

interface SingleLogProps {
	log: FuelLog;
}

const SingleLog = ({ log }: SingleLogProps) => {
	return (
		<Card className="w-45">
			<CardHeader className="flex justify-center">
				<CardTitle>{GetDate(log).toDateString()}</CardTitle>
			</CardHeader>
			<CardContent>
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
			</CardContent>
			<CardFooter>
				<SingleLogOptions log={log} />
			</CardFooter>
		</Card>
	);
};

export default SingleLog;
