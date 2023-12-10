'use client';

import { FuelLogModalContext } from '@/app/context/FuelLogModalContext';
import { FuelLog } from '@/models/FuelLog';
import { deleteFuelLog } from '@/serverActions/FuelLogStorage';
import { RevalidatePath } from '@/serverActions/genericActions';
import { Button } from '@nextui-org/button';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

interface SingleLogOptionsProps {
	log: FuelLog;
}

const SingleLogOptions = ({ log }: SingleLogOptionsProps) => {
	const { dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	return (
		<div className="flex w-full flex-row justify-evenly">
			<Button
				isIconOnly
				color="primary"
				className="w-10"
				onPress={() => {
					dispatch({ type: 'OPEN_MODAL', payload: log });
				}}
			>
				<BiEdit className="text-xl" />
			</Button>
			<Button
				isIconOnly
				color="danger"
				className="w-10"
				onPress={() => {
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
				<BsTrash className="text-xl" />
			</Button>
		</div>
	);
};

export default SingleLogOptions;
