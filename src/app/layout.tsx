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
      <body className="flex h-screen w-screen flex-col">
        <Navbar />
        <div className="h-full w-full overflow-hidden border-2 border-blue-300">
          {children}
        </div>
      </body>
    </html>
  );
}
