'use client';

import { Button } from '@/components/ui/button';
import { FuelLogModalContext } from '@/context/FuelLogModalContext';
import { RevalidatePath } from '@/serverActions/genericActions';
import { FuelLog, deleteFuelLog } from '@fuel-logger/dbutils';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { LuPencil, LuTrash } from 'react-icons/lu';

interface SingleLogOptionsProps {
	log: FuelLog;
}

const SingleLogOptions = ({ log }: SingleLogOptionsProps) => {
	const { dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	return (
		<div className="flex w-full flex-row justify-evenly">
			<Button
				variant="outline"
				size="icon"
				onClick={() => {
					dispatch({ type: 'OPEN_MODAL', payload: log });
				}}
			>
				<LuPencil className="text-xl" />
			</Button>
			<Button
				variant="destructive"
				size="icon"
				onClick={() => {
					if (
						log.key !== undefined &&
						log.key !== null &&
						log.key !== ''
					) {
						deleteFuelLog(log.key);
						RevalidatePath(path);
					}
				}}
			>
				<LuTrash className="text-xl" />
			</Button>
		</div>
	);
};

export default SingleLogOptions;
