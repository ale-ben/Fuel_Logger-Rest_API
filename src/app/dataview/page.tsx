import { FuelLogOverview } from '@/models/FuelLog';
import { getFuelLogs } from '@/serverActions/fuelDB';
import LogElement from '@/app/components/logElement';

export default async function DataView() {
  const logs: FuelLogOverview[] = await getFuelLogs();
  return (
    <div className="flex grow flex-row flex-wrap justify-items-stretch gap-4 p-5">
      {logs.map((log: FuelLogOverview) => (
        <LogElement element={log} key={log.key} />
      ))}
    </div>
  );
}
