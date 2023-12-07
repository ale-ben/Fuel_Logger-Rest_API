// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { FuelLogModalContextProvider } from './context/FuelLogModalContext';

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
