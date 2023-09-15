import { redirect } from 'next/navigation';

const ManualLogger = () => {
  redirect('/wip?from=Manual Logger');
  return <div>ManualLogger</div>;
};

export default ManualLogger;
