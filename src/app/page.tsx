import { getFuelLogs } from '@/serverActions/FuelLogStorage';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import SingleLog from './components/logViewComponents/singleLog';

export default async function LogView() {
	const logs = await getFuelLogs();

	return (
		<div className="flex flex-col">
			<div className="text-center text-2xl">Fuel Logs</div>
			<div className="m-5">
				<ScrollShadow className="h-[600px] w-full">
					<div className="flex flex-row flex-wrap justify-evenly gap-2 px-3">
						{logs.map((log) => (
							<SingleLog key={log.id} log={log} />
						))}
					</div>
				</ScrollShadow>
			</div>
		</div>
	);
}
