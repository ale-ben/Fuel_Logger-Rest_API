import packageInfo from '../../../package.json';

export default function Footer() {
	return (
		<p className="absolute bottom-2 right-0 grid w-full grid-cols-3 text-sm text-gray-300 dark:text-gray-800">
			<a
				className="ml-2 mr-5"
				href="https://github.com/ale-ben/Fuel_Logger/tree/master"
			>
				https://github.com/ale-ben/Fuel_Logger/tree/master
			</a>
			<a className="text-center">
				Released under{' '}
				<i>GNU GENERAL PUBLIC LICENSE version 3</i>
			</a>
			<a className="mr-2 text-right">v{packageInfo.version}</a>
		</p>
	);
}
