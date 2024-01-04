'use client';

import {
	FuelLogModalReducer,
	FuelLogModalReducerAction,
	defaultFuelLogModalState
} from '@/models/FuelLogModalReducer';
import { createContext, useReducer } from 'react';

export const FuelLogModalContext = createContext({
	state: defaultFuelLogModalState,
	dispatch: (action: FuelLogModalReducerAction) => {}
});

export function FuelLogModalContextProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [state, dispatch] = useReducer(
		FuelLogModalReducer,
		defaultFuelLogModalState
	);

	return (
		<FuelLogModalContext.Provider value={{ state, dispatch }}>
			{children}
		</FuelLogModalContext.Provider>
	);
}
