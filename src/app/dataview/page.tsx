import { redirect } from 'next/navigation';

const DataView = () => {
  redirect('/wip?from=Data View');
  return <div>DataView</div>;
};

export default DataView;
