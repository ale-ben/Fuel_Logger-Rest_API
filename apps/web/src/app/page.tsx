import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FuelLog, getFuelLogs } from '@fuel-logger/dbutils';
import { DateRange } from 'react-day-picker';
import SingleLog from './components/logViewComponents/singleLog';
import TopBar from './components/logViewComponents/topBar';

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LogView({ searchParams }: Props) {
	let filterRange: DateRange | undefined = undefined;

	if (searchParams && searchParams.from && searchParams.to) {
		filterRange = {
			from: new Date(searchParams.from as string),
			to: new Date(searchParams.to as string)
		};
	}
	const logs = await getFuelLogs(filterRange);

	return (
		<div className="flex h-full flex-col">
			<div className="m-5 grow">
				<TopBar dateRange={filterRange} />
				<Separator className="my-5" />
				<ScrollArea className="mt-5 h-[550px] w-full">
					<div className="flex flex-row flex-wrap justify-evenly gap-2 px-3">
						{logs ? (
							logs.map((log: FuelLog, index: number) => (
								<SingleLog key={index} log={log} />
							))
						) : (
							<p className="text-xl">No log found</p>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
