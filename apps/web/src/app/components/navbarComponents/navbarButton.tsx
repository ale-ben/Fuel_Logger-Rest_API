'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarButtonProps {
	href: string;
	text: string;
}
const NavbarButton = ({ href, text }: NavbarButtonProps) => {
	const pathname = usePathname();

	const activeClass =
		'text-sm font-medium transition-colors hover:text-primary';
	const nonActiveClass =
		'text-sm font-medium text-muted-foreground transition-colors hover:text-primary';

	return (
		<Link
			href={href}
			className={href === pathname ? activeClass : nonActiveClass}
		>
			{text}
		</Link>
	);
};

export default NavbarButton;
