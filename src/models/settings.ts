export type SettingsType = {
  [key: string]: string;
  currentDB: string;
};

/**
 * Checks if an object is a settings object
 * @param obj The object to check
 * @returns True if the object is a settings object, false otherwise
 */
export function isSettings(obj: any): obj is SettingsType {
  const checkObj = obj !== undefined;
  const checkCurrentDB = typeof obj.currentDB === 'string';

  if (checkObj && checkCurrentDB) {
    return true;
  } else {
    console.log(`Invalid settings ${JSON.stringify(obj)}
	obj: ${checkObj}
	typeof obj.currentDB === 'string': ${checkCurrentDB}
	  `);
    return false;
  }
}

/**
 * Generate the default settings
 * @returns The default settings
 */
export function generateDefaultSettings() {
  return {
    currentDB: 'fuelDB',
  };
}
