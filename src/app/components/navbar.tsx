import Link from 'next/link';
import { BsFuelPumpFill } from 'react-icons/bs';
import { NavbarLink, NavbarPages } from './navbarPages';

const navLinks: NavbarLink[] = [
  { href: '/', label: 'Home' },
  { href: '/viewer', label: 'Viewer' },
  { href: '/manuallogger', label: 'Manual Logger' },
  { href: '/bulklogger', label: 'Bulk Logger' },
];

const Navbar = () => {
  return (
    <nav className="flex-none border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <BsFuelPumpFill className="mr-3 h-8 dark:text-white" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Fuel Logger
          </span>
        </Link>
        <NavbarPages navLinks={navLinks} />
      </div>
    </nav>
  );
};

export default Navbar;
