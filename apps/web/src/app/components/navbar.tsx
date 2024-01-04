import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LuFuel } from 'react-icons/lu';
import DarkModeToggle from './navbarComponents/darkModeToggle';
import NavbarButton from './navbarComponents/navbarButton';

interface NavbarElems {
	name: string;
	href: string;
}

const navbarElems: NavbarElems[] = [
	{
		name: 'Home',
		href: '/'
	},
	{
		name: 'test',
		href: '/test'
	}
];

const Navbar = () => {
	return (
		<div className="hidden flex-col md:flex">
			<div className="border-b">
				<div className="flex h-16 items-center px-4">
					<LuFuel className="mr-2 text-xl" />
					<a className="text-xl font-bold">Fuel Logger</a>

					<div
						className={cn(
							'flex items-center space-x-4 lg:space-x-6 mx-6'
						)}
					>
						{navbarElems.map((item, index) => (
							<NavbarButton
								key={index}
								href={item.href}
								text={item.name}
							/>
						))}
					</div>
					<div className="ml-auto flex items-center space-x-4">
						{process.env.NODE_ENV == 'production' ? (
							<Link href="/api/auth/signout" color="foreground">
								Sign out
							</Link>
						) : (
							<></>
						)}
						<DarkModeToggle />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
