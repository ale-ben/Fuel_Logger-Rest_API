'use server';

import {
  SettingsType,
  generateDefaultSettings,
  isSettings,
} from '@/models/settings';
import { Deta } from 'deta'; // import Deta

// Initialize deta client
const DETA_PROJECT_KEY = process.env.DETA_PROJECT_KEY || 'key';
const deta = Deta(DETA_PROJECT_KEY);
// Initialize your DB
const settingsDB = deta.Base('settingsDB');

/**
 * Get the settings
 * @returns The settings
 */
export async function getSettings(): Promise<SettingsType> {
  // Fetch the settings
  const settings = await settingsDB.fetch({});

  // If the settings are not found, use the default settings
  if (settings.count === 0) {
    const defaultSettings = generateDefaultSettings();
    console.log('Settings not found, using default settings');
    await setSettings(defaultSettings);
    return defaultSettings;
  }

  // Parse the settings
  let settingsObj: { [key: string]: string } = {};
  settings.items.forEach((item) => {
    if (
      typeof item.key === 'string' &&
      (typeof item.value === 'string')
    ) {
      settingsObj[item.key] = item.value;
    } else {
		console.log(`Invalid settings item ${JSON.stringify(item)}`);
	}
  });

  // If the settings are invalid, use the default settings
  if (isSettings(settingsObj)) {
    return settingsObj;
  } else {
    const defaultSettings = generateDefaultSettings();
    console.log('Unable to parse settings, using default settings');
    return defaultSettings;
  }
}

/**
 * Set the settings
 * @param settings The settings to set
 * TODO: Optimize this function by updating only the changed settings
 */
export async function setSettings(settings: SettingsType): Promise<void> {
  Object.keys(settings).forEach(async (key) => {
    await settingsDB.put({ key: key, value: settings[key] });
  });
}
