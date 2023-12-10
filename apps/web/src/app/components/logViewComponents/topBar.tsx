'use client';

import { FuelLogModalContext } from '@/app/context/FuelLogModalContext';
import { RevalidatePath } from '@/serverActions/genericActions';
import { defaultFuelLog } from '@fuel-logger/dbutils';
import { Button } from '@nextui-org/button';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import EditLogModal from './editLogModal';

const TopBar = () => {
	const { state, dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	return (
		<div className="flex flex-row justify-between">
			<div>Filter</div>
			<div>Search</div>
			<div>
				<Button
					isIconOnly
					className="mr-2"
					onPress={() => {
						RevalidatePath(path);
					}}
				>
					<BiRefresh className="text-3xl" />
				</Button>
				<Button
					isIconOnly
					onPress={() =>
						dispatch({
							type: 'OPEN_MODAL',
							payload: defaultFuelLog
						})
					}
				>
					<IoIosAdd className="text-3xl" />
				</Button>
				<EditLogModal />
			</div>
		</div>
	);
};

export default TopBar;
