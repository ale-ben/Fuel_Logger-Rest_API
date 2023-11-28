import { FuelEntry, FuelLog } from '@/models/FuelLog';
import { createFuelLog } from '@/serverActions/FuelLogStorage';
import { RevalidatePath } from '@/serverActions/genericActions';
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
import { Dispatch, SetStateAction, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';

interface NewLogModalProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultEntry: FuelEntry = {
	date: new Date().getTime(),
	amount: 0,
	price: 0
};

const defaultLog: FuelLog = {
	odometer: 0,
	entries: [defaultEntry]
};

const NewLogModal = ({ isOpen, setOpen }: NewLogModalProps) => {
	const [fuelLog, setFuelLog] = useState<FuelLog>(defaultLog);
	const path = usePathname();

	return (
		<Modal
			isOpen={isOpen}
			scrollBehavior="inside"
			onClose={() => {
				setOpen(false);
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
						value={fuelLog.odometer.toString()}
						onChange={(e) => {
							setFuelLog({
								...fuelLog,
								odometer: parseFloat(e.target.value)
							});
						}}
					/>
					<div className="flex flex-row justify-between">
						<p className="text-xl">Entries:</p>
						<Button
							isIconOnly
							size="sm"
							onPress={() =>
								setFuelLog({
									...fuelLog,
									entries: [...fuelLog.entries, defaultEntry]
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
						{fuelLog.entries
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
												setFuelLog({
													...fuelLog,
													entries:
														fuelLog.entries.map(
															(elem, i) => {
																if (
																	i === index
																) {
																	try {
																		const d =
																			new Date(
																				e.target.value
																			).getTime();
																		if (
																			isNaN(
																				d
																			)
																		)
																			return elem;
																		return {
																			...elem,
																			date: d
																		};
																	} catch (err) {
																		console.error(
																			'Invalid date',
																			e
																				.target
																				.value
																		);
																		return elem;
																	}
																}
																return elem;
															}
														)
												});
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
													setFuelLog({
														...fuelLog,
														entries:
															fuelLog.entries.map(
																(elem, i) => {
																	if (
																		i ===
																		index
																	) {
																		return {
																			...elem,
																			amount: parseFloat(
																				e
																					.target
																					.value
																			)
																		};
																	}
																	return elem;
																}
															)
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
													setFuelLog({
														...fuelLog,
														entries:
															fuelLog.entries.map(
																(elem, i) => {
																	if (
																		i ===
																		index
																	) {
																		return {
																			...elem,
																			price: parseFloat(
																				e
																					.target
																					.value
																			)
																		};
																	}
																	return elem;
																}
															)
													});
												}}
											/>
										</div>
										{fuelLog.entries.length > 1 ? (
											<div className="flex justify-end">
												<Button
													isIconOnly
													size="sm"
													color="danger"
													disabled={
														fuelLog.entries
															.length <= 1
													}
													onClick={() => {
														setFuelLog({
															...fuelLog,
															entries:
																fuelLog.entries.filter(
																	(elem, i) =>
																		i !==
																		index
																)
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
							setFuelLog(defaultLog);
						}}
					>
						Reset
					</Button>
					<Button
						color="primary"
						onClick={() => {
							createFuelLog(fuelLog);
							setFuelLog(defaultLog);
							setOpen(false);
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

export default NewLogModal;
