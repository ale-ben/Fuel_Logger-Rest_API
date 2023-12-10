import { getFuelLogs } from '@/serverActions/FuelLogStorage';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import SingleLog from './components/logViewComponents/singleLog';
import TopBar from './components/logViewComponents/topBar';

export default async function LogView() {
	const logs = await getFuelLogs();

	return (
		<div className="flex flex-col">
			<div className="text-center text-2xl">Fuel Logs</div>
			<div className="m-5">
				<TopBar />
				<ScrollShadow className="mt-5 h-[500px] w-full">
					<div className="flex flex-row flex-wrap justify-evenly gap-2 px-3">
						{logs ? (
							logs.map((log, index) => (
								<SingleLog key={index} log={log} />
							))
						) : (
							<p className="text-xl">No log found</p>
						)}
					</div>
				</ScrollShadow>
			</div>
		</div>
	);
}
