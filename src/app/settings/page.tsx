import { SettingsType } from '@/models/settings';
import { getSettings, setSettings } from '@/serverActions/settingsDB';
import React from 'react';
import SettingsForm from './components/settingsForm';
import { updateFuelDBSettings } from '@/serverActions/fuelDB';

const Settings = async () => {
  const settings: SettingsType = await getSettings();
  return (
    <div className="flex flex-col">
      <div className="text-2xl">Settings</div>
      <SettingsForm settings={settings} setSettings={setSettings} updateFuelDBSettings={updateFuelDBSettings}/>
    </div>
  );
};

export default Settings;
