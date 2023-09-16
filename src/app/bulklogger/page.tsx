import { redirect } from 'next/navigation';

const BulkLogger = () => {
  redirect('/wip?from=Bulk Logger');
  return <div>BulkLogger</div>;
};

export default BulkLogger;
