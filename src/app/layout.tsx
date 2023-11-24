import Navbar from './components/navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Fuel Logger',
	description: 'Tool for tracking fuel consumption of a vehicle'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en" className="dark">
			<body>
				<Providers>
					<div className="flex h-screen w-screen flex-col gap-5">
						<Navbar />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
