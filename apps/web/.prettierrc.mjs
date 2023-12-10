import baseConfig from '@fuel-logger/prettier-config/base.json' assert {
	type: 'json',
};

export default {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
		'prettier-plugin-tailwindcss'
	]
};
