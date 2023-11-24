import LogViewComponent from './components/logView';

export default async function LogView() {
	return (
		<div className="flex flex-col">
			<div className="text-center text-2xl">Fuel Logs</div>
			<LogViewComponent />
		</div>
	);
}
