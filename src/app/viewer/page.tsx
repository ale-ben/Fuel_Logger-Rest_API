import { redirect } from 'next/navigation';

const Viewer = () => {
  redirect('/wip?from=viewer');
  return <div>Viewer</div>;
};

export default Viewer;
