'use client';

import { Button } from '@/components/ui/button';
import { FuelLogModalContext } from '@/context/FuelLogModalContext';
import { RevalidatePath } from '@/serverActions/genericActions';
import { defaultFuelLog } from '@fuel-logger/dbutils';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { LuPlus, LuRefreshCw } from 'react-icons/lu';
import EditLogModal from './editLogModal';

const TopBar = () => {
	const { dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	return (
		<div className="flex flex-row justify-between">
			<div>Filter by date</div>
			<div>
				<Button
					variant="outline"
					size="icon"
					className="mr-2"
					onClick={() => {
						RevalidatePath(path);
					}}
				>
					<LuRefreshCw className="text-xl" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() =>
						dispatch({
							type: 'OPEN_MODAL',
							payload: defaultFuelLog
						})
					}
				>
					<LuPlus className="text-xl" />
				</Button>
				<EditLogModal />
			</div>
		</div>
	);
};

export default TopBar;
