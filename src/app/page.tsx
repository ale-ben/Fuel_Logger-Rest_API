import { FuelLog } from '@/models/FuelLog';
import { getFuelLogs } from '@/serverActions/fuelDB';
import LogElement from './components/logElement';

export default async function Home() {
  const logs: FuelLog[] = await getFuelLogs();
  return (
    <div className="flex flex-wrap p-5">
      {logs.map((log: FuelLog) => (
        <LogElement element={log} key={log.id} />
      ))}
    </div>
  );
}
