// app/providers.tsx
'use client';

import { FuelLogModalContextProvider } from '@/context/FuelLogModalContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<FuelLogModalContextProvider>
				{children}
			</FuelLogModalContextProvider>
		</ThemeProvider>
	);
}
