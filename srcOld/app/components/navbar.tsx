'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BsFuelPumpFill } from 'react-icons/bs';

interface NavbarLink {
  href: string;
  label: string;
}

const navLinks: NavbarLink[] = [
  { href: '/', label: 'Home' },
  { href: '/viewer', label: 'Viewer' },
  { href: '/manuallogger', label: 'Manual Logger' },
  { href: '/bulklogger', label: 'Bulk Logger' },
];

export default function MyNavbar() {
  {
    /* Get the current route */
  }
  const currentRoute = usePathname();

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <BsFuelPumpFill className="mr-3 h-8 dark:text-white" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Fuel Logger
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            {
              /* Loop over the navLinks array and show a link for each */
              navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      currentRoute === href
                        ? 'navbar_selected'
                        : 'navbar_unselected'
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
      </div>
    </nav>
  );
}
