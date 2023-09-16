'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import Link from 'next/link';
import { BsFuelPumpFill } from 'react-icons/bs';
import { DropdownItem } from 'flowbite-react/lib/esm/components/Dropdown/DropdownItem';
import { usePathname } from 'next/navigation';

interface NavbarLink {
  href: string;
  label: string;
}

interface NavbarDropdown {
  href: string;
  label: string;
  elements: NavbarLink[];
}

export type NavbarElementsInterface = NavbarLink | NavbarDropdown;

const navLinks: NavbarElementsInterface[] = [
  { href: '/', label: 'Home' },
  {
    label: 'View',
    href: '/view',
    elements: [
      {
        href: '/data',
        label: 'Data View',
      },
      {
        href: '/graph',
        label: 'Graph View',
      },
    ],
  },
  {
    label: 'Logger',
    href: '/logger',
    elements: [
      {
        href: '/manuallogger',
        label: 'Manual Logger',
      },
      {
        href: '/bulklogger',
        label: 'Bulk Logger',
      },
    ],
  },
  {
    href: '/settings',
    label: 'Settings',
  },
];

const CustomNavbar = () => {
  const currentRoute = usePathname();
  return (
    <Navbar fluid>
      <Navbar.Brand href="/">
        <BsFuelPumpFill className="mr-3 h-8 dark:text-white" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Fuel Logger
        </span>
      </Navbar.Brand>
      <Navbar.Collapse className="mr-5">
        {navLinks.map((el) =>
          'elements' in el ? (
            <Dropdown
              inline
              label={
                <div className="border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                  {el.label}
                </div>
              }
              key={el.href}
            >
              {el.elements.map((subEl) => (
                <Dropdown.Item key={subEl.href} href={subEl.href}>
                  {subEl.label}
                </Dropdown.Item>
              ))}
            </Dropdown>
          ) : (
            <Navbar.Link
              href={el.href}
              key={el.href}
              active={currentRoute === el.href}
            >
              {el.label}
            </Navbar.Link>
          ),
        )}
        <Navbar.Toggle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
