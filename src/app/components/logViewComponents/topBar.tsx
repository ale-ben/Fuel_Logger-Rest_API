'use client';

import { RevalidatePath } from '@/serverActions/genericActions';
import { Button } from '@nextui-org/button';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import NewLogModal from './newLogModal';

const TopBar = () => {
	const [isOpen, setOpen] = useState(false);
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
				<Button isIconOnly onPress={() => setOpen(true)}>
					<IoIosAdd className="text-3xl" />
				</Button>
				<NewLogModal isOpen={isOpen} setOpen={setOpen} />
			</div>
		</div>
	);
};

export default TopBar;
