'use client';

import { Button } from '@nextui-org/button';
import { IoIosAdd } from 'react-icons/io';
import { useState } from 'react';
import NewLogModal from './newLogModal';

const TopBar = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="flex flex-row justify-between">
			<div>Filter</div>
			<div>Search</div>
			<div>
				Refresh
				<Button isIconOnly onPress={() => setOpen(true)}>
					<IoIosAdd className="text-3xl" />
				</Button>
				<NewLogModal isOpen={isOpen} setOpen={setOpen} />
			</div>
		</div>
	);
};

export default TopBar;
