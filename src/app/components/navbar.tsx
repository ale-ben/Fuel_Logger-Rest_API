import React from 'react';
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
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

interface NavbarElems {
	name: string;
	href: string;
}

const navbarElems: NavbarElems[] = [
	{
		name: 'Logger',
		href: '/logger'
	},
	{
		name: 'History',
		href: '/history'
	}
];

const Navbar1 = () => {
	return (
		<Navbar>
			<NavbarContent>
				<NavbarMenuToggle className="sm:hidden" />
				<NavbarBrand>
					<BsFuelPumpFill className="mr-3 h-8 dark:text-white" />
					<p className="font-bold text-inherit">Fuel Logger</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden gap-4 sm:flex" justify="center">
				{navbarElems.map((item, index) => (
					<NavbarItem key={index}>
						<Link color="foreground" href={item.href}>
							{item.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarMenu>
				{navbarElems.map((item, index) => (
					<NavbarMenuItem key={`${index}`}>
						<Link
							color={
								index === 2 // TODO: This should be dynamic
									? 'primary'
									: index === navbarElems.length - 1
									? 'danger'
									: 'foreground'
							}
							className="w-full"
							href={item.href}
							size="lg"
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default Navbar1;
