import { Link } from '@nextui-org/link';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/navbar';
import { BsFuelPumpFill } from 'react-icons/bs';
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
	}
];

const Navbar1 = () => {
	return (
		<Navbar isBordered maxWidth="full">
			<NavbarBrand>
				<Link href="/" color="foreground">
					<BsFuelPumpFill className="mr-3 h-8 dark:text-white" />
					<p className="font-bold text-inherit">Fuel Logger</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				{navbarElems.map((item, index) => (
					<NavbarButton
						key={index}
						href={item.href}
						text={item.name}
					/>
				))}
			</NavbarContent>

			<NavbarContent justify="end">
				{process.env.NODE_ENV == 'production' ? (
					<NavbarItem>
						<Link
							href="/api/auth/signout"
							color="foreground"
						>
							Sign out
						</Link>
					</NavbarItem>
				) : (
					<></>
				)}
				<NavbarItem>
					<DarkModeToggle />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default Navbar1;
