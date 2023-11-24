import { BsFuelPumpFill } from 'react-icons/bs';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import NavbarButton from './navbarComponents/navbarButton';
import DarkModeToggle from './navbarComponents/darkModeToggle';

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
				<NavbarItem>
					<DarkModeToggle />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default Navbar1;
