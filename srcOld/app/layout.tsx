import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MyNavbar from './components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fuel Logger',
  description: 'Log fuel consumptions for a vehicle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen max-h-screen w-screen flex-col overflow-hidden border-4 border-green-500 bg-blue-100 dark:bg-blue-900`}
      >
        <MyNavbar />
        <div className="m-5 grow overflow-hidden border-2 border-red-500">
          {children}
        </div>
      </body>
    </html>
  );
}
