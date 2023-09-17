export enum Theme {
  Light,
  Dark,
  Auto,
}

export type Settings = {
  [key: string]: string | number;
  currentDB: string;
  theme: Theme;
};

/**
 * Checks if an object is a settings object
 * @param obj The object to check
 * @returns True if the object is a settings object, false otherwise
 */
export function isSettings(obj: any): obj is Settings {
  const checkObj = obj !== undefined;
  const checkCurrentDB = typeof obj.currentDB === 'string';
  const checkTheme = typeof obj.theme === 'number';

  if (checkObj && checkCurrentDB && checkTheme) {
    return true;
  } else {
    console.log(`Invalid settings ${JSON.stringify(obj)}
	obj: ${checkObj}
	typeof obj.currentDB === 'string': ${checkCurrentDB}
	typeof obj.theme === 'number': ${checkTheme}
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
    theme: Theme.Auto,
  };
}
