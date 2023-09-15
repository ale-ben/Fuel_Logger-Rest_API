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
      <body>
        <Navbar />
		<div className='flex w-full grow border-blue-400 border-2'>
        {children}
		</div>
      </body>
    </html>
  );
}
