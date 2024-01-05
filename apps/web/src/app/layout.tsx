import Navbar from '@/components/navbar/navbar';
import { cn } from '@/lib/utils';
import { authOptions } from '@/models/AuthOptions';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter as FontSans } from 'next/font/google';
import { redirect } from 'next/navigation';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Fuel Logger',
	description: 'Tool for tracking fuel consumption of a vehicle'
};

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
});

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
			<body
				className={cn(
					'h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
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
