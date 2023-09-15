'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavbarLink {
  href: string;
  label: string;
}

interface Props {
  navLinks: NavbarLink[];
}

const pageStyle = 'block rounded py-2 pl-3 pr-4 dark:text-white md:p-0';
const currentPageStyle =
  'bg-blue-700 text-white md:bg-transparent  md:text-blue-700 md:dark:text-blue-500';
const otherPageStyle =
  'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500';

export const NavbarPages = ({ navLinks }: Props) => {
  const currentRoute = usePathname();

  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
        {
          // Loop over the navLinks array and show a link for each
          navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  pageStyle +
                  ' ' +
                  (currentRoute === href ? currentPageStyle : otherPageStyle)
                }
                aria-current={currentRoute === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
