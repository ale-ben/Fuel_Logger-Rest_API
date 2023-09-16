import { redirect } from 'next/navigation';

const GraphView = () => {
  redirect('/wip?from=Graph View');
  return <div>GraphView</div>;
};

export default GraphView;
