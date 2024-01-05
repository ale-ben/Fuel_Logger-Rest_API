import { ScrollArea } from '@/components/ui/scroll-area';
import { getFuelLogs } from '@fuel-logger/dbutils';
import SingleLog from './components/logViewComponents/singleLog';
import TopBar from './components/logViewComponents/topBar';
import { Separator } from '@/components/ui/separator';

export default async function LogView() {
	const logs = await getFuelLogs();

	return (
		<div className="flex h-full flex-col">
			<div className="text-center text-2xl">Fuel Logs</div>
			<div className="m-5 grow">
				<TopBar />
				<Separator className='my-5'/>
				<ScrollArea className="mt-5 h-[550px] w-full">
					<div className="flex flex-row flex-wrap justify-evenly gap-2 px-3">
						{logs ? (
							logs.map((log, index) => (
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
