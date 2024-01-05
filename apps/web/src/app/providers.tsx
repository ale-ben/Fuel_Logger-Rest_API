// app/providers.tsx
'use client';

import { FuelLogModalContextProvider } from '@/context/FuelLogModalContext';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<FuelLogModalContextProvider>
					{children}
				</FuelLogModalContextProvider>
			</ThemeProvider>
		</NextUIProvider>
	);
}
