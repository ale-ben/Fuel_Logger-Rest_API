'use client';

import React from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { SettingsType } from '@/models/settings';
import { updateFuelDBSettings } from '@/serverActions/fuelDB';

interface Props {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => Promise<void>;
  updateFuelDBSettings: () => Promise<void>;
}

const SettingsForm = ({ settings, setSettings }: Props) => {
  const dbRef = React.useRef<HTMLInputElement>(null);
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="db" value="Current DB" />
        </div>
        {/* TODO: List all available databases */}
        <TextInput
          id="db"
          placeholder="Name of the fuel database to use"
          required
          ref={dbRef}
          defaultValue={settings.currentDB}
        />
      </div>
      <div className="flex  gap-3">
        <Button
          type="reset"
          color="failure"
          onClick={() => {
            dbRef.current!.value = settings.currentDB;
          }}
        >
          Reset
        </Button>
        <Button
          type="submit"
          color="success"
          onClick={async () => {
            settings.currentDB = dbRef.current!.value;
            await setSettings(settings);
            updateFuelDBSettings();
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
