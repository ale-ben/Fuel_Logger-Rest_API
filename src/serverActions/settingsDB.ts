'use server';

import {
  Settings,
  generateDefaultSettings,
  isSettings,
} from '@/models/settings';
import { Deta } from 'deta'; // import Deta

// Initialize deta client
const deta = Deta();
// Initialize your DB
const settingsDB = deta.Base('settingsDB');

/**
 * Get the settings
 * @returns The settings
 */
export async function getSettings(): Promise<Settings> {
  // Fetch the settings
  const settings = await settingsDB.fetch();

  // If the settings are not found, use the default settings
  if (settings.count === 0) {
    const defaultSettings = generateDefaultSettings();
    console.log('Settings not found, using default settings');
    await setSettings(defaultSettings);
    return defaultSettings;
  }

  // Parse the settings
  let settingsObj: { [key: string]: string | number } = {};
  settings.items.forEach((item) => {
    if (
      typeof item.key === 'number' &&
      (typeof item.value === 'string' || typeof item.value === 'number')
    ) {
      settingsObj[item.key] = item.value;
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
export async function setSettings(settings: Settings): Promise<void> {
  Object.keys(settings).forEach(async (key) => {
    await settingsDB.put({ key: key, value: settings[key] });
  });
}
