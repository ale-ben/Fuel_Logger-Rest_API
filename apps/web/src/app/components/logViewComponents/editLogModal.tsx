'use client';

import { FuelLogModalContext } from '@/app/context/FuelLogModalContext';
import { RevalidatePath } from '@/serverActions/genericActions';
import {
	FuelEntry,
	defaultFuelEntry,
	defaultFuelLog,
	saveFuelLog
} from '@fuel-logger/dbutils';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/modal';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';

const EditLogModal = () => {
	const { state, dispatch } = useContext(FuelLogModalContext);
	const path = usePathname();

	return (
		<Modal
			isOpen={state.isModalOpen}
			scrollBehavior="inside"
			onClose={() => {
				dispatch({ type: 'CLOSE_MODAL' });
			}}
		>
			<ModalContent>
				<ModalHeader>Add a fuel log</ModalHeader>
				<ModalBody>
					<Input
						type="number"
						label="Odometer"
						placeholder="Odometer reading in kilometers"
						endContent="km"
						value={state.fuelLog.odometer.toString()}
						onChange={(e) => {
							dispatch({
								type: 'UPDATE_ODOMETER',
								payload: parseFloat(e.target.value)
							});
						}}
					/>
					<div className="flex flex-row justify-between">
						<p className="text-xl">Entries:</p>
						<Button
							isIconOnly
							size="sm"
							onPress={() =>
								dispatch({
									type: 'ADD_ENTRY',
									payload: defaultFuelEntry
								})
							}
						>
							<IoIosAdd className="text-xl" />
						</Button>
					</div>
					<Accordion
						isCompact
						selectionMode="single"
						defaultExpandedKeys={['0']}
						variant="splitted"
					>
						{state.fuelLog.entries
							.sort((a: FuelEntry, b: FuelEntry) => {
								return a.date - b.date;
							})
							.map((entry, index) => (
								<AccordionItem
									key={index.toString()}
									title={new Date(entry.date).toDateString()}
								>
									<div className="mb-3 flex flex-col gap-2">
										<Input
											type="Date"
											label="Date"
											value={
												new Date(entry.date)
													.toISOString()
													.split('T')[0] //FIXME: [FL-32] This blows up when the date is invalid
											}
											onChange={(e) => {
												try {
													const d = new Date(
														e.target.value
													).getTime();
													if (isNaN(d)) return;
													dispatch({
														type: 'UPDATE_ENTRY',
														payload: {
															index: index,
															entry: {
																...entry,
																date: d
															}
														}
													});
												} catch (err) {
													console.error(
														'Invalid date',
														e.target.value
													);
													return;
												}
											}}
										/>
										<div className="flex flex-row gap-2">
											<Input
												type="number"
												label="Amount"
												placeholder="Amount of fuel in liters"
												endContent="L"
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
											<Input
												type="number"
												label="Price"
												placeholder="Price of fuel in euros"
												endContent="€"
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
										{state.fuelLog.entries.length > 1 ? (
											<div className="flex justify-end">
												<Button
													isIconOnly
													size="sm"
													color="danger"
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
													<BsTrash className="text-lg" />
												</Button>
											</div>
										) : (
											<></>
										)}
									</div>
								</AccordionItem>
							))}
					</Accordion>
				</ModalBody>
				<ModalFooter>
					<Button
						color="danger"
						variant="flat"
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
						color="primary"
						onClick={() => {
							saveFuelLog(state.fuelLog);
							dispatch({ type: 'CLOSE_MODAL' });
							RevalidatePath(path);
						}}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditLogModal;
