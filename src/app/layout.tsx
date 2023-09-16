import Navbar from './components/navbar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Logger',
  description: 'Tool for tracking fuel consumption of a vehicle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='flex flex-col w-screen h-screen'>
        <Navbar/>
		<div className='w-full h-full border-blue-300 border-2 overflow-hidden'>
        {children}
		</div>
      </body>
    </html>
  );
}
