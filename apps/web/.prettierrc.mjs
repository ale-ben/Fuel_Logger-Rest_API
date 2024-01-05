import {baseConfig} from '@fuel-logger/config-prettier/base.mjs' 

export default {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
		'prettier-plugin-tailwindcss'
	]
};
