import { Card, CardHeader } from '@nextui-org/card';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHeader,
	TableColumn
} from '@nextui-org/table';

const SingleLog = () => {
	return (
		<Card>
			<CardHeader>2023/11/24 - 12:14</CardHeader>
			<div className="flex flex-col px-3 pb-3">
				<div className="flex flex-row justify-evenly">
					<p>Km</p>
					<p>179.7</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p>L</p>
					<p>14.65</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p>€</p>
					<p>16.23</p>
				</div>
				<div className="flex flex-row justify-evenly">
					<p>€/L</p>
					<p>1.987</p>
				</div>
			</div>
		</Card>
	);
};

export default SingleLog;
