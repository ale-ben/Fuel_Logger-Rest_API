'use client';

import { Button } from '@/components/ui/button';
import { FuelLogModalContext } from '@/context/FuelLogModalContext';
import { RevalidatePath } from '@/serverActions/genericActions';
import { defaultFuelLog } from '@fuel-logger/dbutils';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { LuPlus, LuRefreshCw } from 'react-icons/lu';
import EditLogModal from './editLogModal';

import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

const TopBar = () => {
	const { dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: new Date()
	});

	return (
		<div className="flex flex-row justify-between align-middle">
			<div className="flex flex-row">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={'outline'}
							className={cn(
								'justify-start text-left font-normal',
								!date && 'text-muted-foreground'
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, 'LLL dd, y')} -{' '}
										{format(date.to, 'LLL dd, y')}
									</>
								) : (
									format(date.from, 'LLL dd, y')
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={setDate}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
				<Button
					variant="outline"
					className="ml-2"
					disabled={
						date === undefined ||
						date.from === undefined ||
						date.to === undefined
					}
				>
					Submit
				</Button>
			</div>
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
