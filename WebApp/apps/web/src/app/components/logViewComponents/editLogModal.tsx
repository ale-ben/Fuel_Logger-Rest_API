'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { FuelLogModalContext } from '@/context/FuelLogModalContext';
import { cn } from '@/lib/utils';
import { RevalidatePath } from '@/serverActions/genericActions';
import {
	defaultFuelEntry,
	defaultFuelLog,
	saveFuelLog
} from '@fuel-logger/dbutils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { LuPlus, LuTrash } from 'react-icons/lu';

const EditLogModal = () => {
	const { state, dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	function openChange(status: boolean) {
		if (status) {
			dispatch({ type: 'OPEN_MODAL', payload: defaultFuelLog });
		} else {
			dispatch({ type: 'CLOSE_MODAL' });
		}
	}

	return (
		<Dialog open={state.isModalOpen} onOpenChange={openChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">
						Add a fuel log
					</DialogTitle>
				</DialogHeader>
				<div>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="odometer">Odometer (Km)</Label>
						<Input
							type="number"
							id="odometer"
							placeholder="Odometer reading in kilometers"
							value={state.fuelLog.odometer.toString()}
							onChange={(e) => {
								dispatch({
									type: 'UPDATE_ODOMETER',
									payload: parseFloat(e.target.value)
								});
							}}
						/>
					</div>
					<Separator className="my-5" />
					<div className="flex flex-row justify-between">
						<p className="text-lg">Entries:</p>
						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								dispatch({
									type: 'ADD_ENTRY',
									payload: defaultFuelEntry
								})
							}
						>
							<LuPlus className="text-lg" />
						</Button>
					</div>
					<Accordion type="single" collapsible defaultValue="0">
						{state.fuelLog.entries.map((entry, index) => (
							<AccordionItem
								key={index.toString()}
								value={index.toString()}
							>
								<AccordionTrigger>
									{new Date(entry.date).toDateString()}
								</AccordionTrigger>
								<AccordionContent>
									<div className="mb-3 flex flex-col items-center gap-2">
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] justify-start text-left font-normal',
														!new Date(entry.date) &&
															'text-muted-foreground'
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{format(
														new Date(entry.date),
														'PPP'
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													selected={
														new Date(entry.date)
													}
													onSelect={(d) => {
														if (d)
															dispatch({
																type: 'UPDATE_ENTRY',
																payload: {
																	index: index,
																	entry: {
																		...entry,
																		date: d.getTime()
																	}
																}
															});
													}}
													initialFocus
												/>
											</PopoverContent>
										</Popover>

										<div className="mt-2 flex w-full flex-row justify-evenly gap-2">
											<div className="grid items-center gap-1.5">
												<Label htmlFor="amount">
													Amount (Liters)
												</Label>
												<Input
													type="number"
													id="amount"
													placeholder="Amount of fuel in liters"
													value={entry.amount.toString()}
													onChange={(e) => {
														dispatch({
															type: 'UPDATE_ENTRY',
															payload: {
																index: index,
																entry: {
																	...entry,
																	amount: parseFloat(
																		e.target
																			.value
																	)
																}
															}
														});
													}}
												/>
											</div>
											<div className="grid items-center gap-1.5">
												<Label htmlFor="price">
													Price (€)
												</Label>
												<Input
													type="number"
													id="price"
													placeholder="Price of fuel in euros"
													value={entry.price.toString()}
													onChange={(e) => {
														dispatch({
															type: 'UPDATE_ENTRY',
															payload: {
																index: index,
																entry: {
																	...entry,
																	price: parseFloat(
																		e.target
																			.value
																	)
																}
															}
														});
													}}
												/>
											</div>
										</div>
										{state.fuelLog.entries.length > 1 ? (
											<div className="mt-2 flex w-full justify-end">
												<Button
													variant="destructive"
													size="icon"
													disabled={
														state.fuelLog.entries
															.length <= 1
													}
													onClick={() => {
														dispatch({
															type: 'REMOVE_ENTRY',
															payload: index
														});
													}}
												>
													<LuTrash className="text-lg" />
												</Button>
											</div>
										) : (
											<></>
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
				<DialogFooter>
					<Button
						variant="destructive"
						onClick={() => {
							dispatch({
								type: 'SET_FUEL_LOG',
								payload: defaultFuelLog
							});
						}}
					>
						Reset
					</Button>
					<Button
						onClick={() => {
							saveFuelLog(state.fuelLog);
							dispatch({ type: 'CLOSE_MODAL' });
							RevalidatePath(path);
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditLogModal;
