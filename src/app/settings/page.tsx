import { redirect } from 'next/navigation';

const Settings = () => {
  redirect('/wip?from=Settings');
  return <div>Settings</div>;
};

export default Settings;
