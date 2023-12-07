import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import Navbar from './components/navbar';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Fuel Logger',
	description: 'Tool for tracking fuel consumption of a vehicle'
};

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	//FIXME: I know that this is blasphemy but I don't care enough (and as soon as Deta upgrades to node 18, auth won't be necessary)
	if (process.env.NODE_ENV == 'production') {
		const session = await getServerSession(authOptions);
		if (!session) {
			redirect('/api/auth/signin');
		}
	}
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
