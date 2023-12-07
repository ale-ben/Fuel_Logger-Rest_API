'use client';

import { FuelLogModalContext } from '@/app/context/FuelLogModalContext';
import { FuelLog } from '@/models/FuelLog';
import { Button } from '@nextui-org/button';
import { useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

interface SingleLogOptionsProps {
	log: FuelLog;
}

const SingleLogOptions = ({ log }: SingleLogOptionsProps) => {
	const { dispatch } = useContext(FuelLogModalContext);

	return (
		<div className="flex flex-row justify-evenly w-full">
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
					alert('Not implemented yet');
				}}
			>
				<BsTrash className="text-xl" />
			</Button>
		</div>
	);
};

export default SingleLogOptions;
