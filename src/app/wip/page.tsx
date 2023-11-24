interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

const WorkInProgress = ({ searchParams }: Props) => {
	const from = searchParams.from as string | undefined;

	return (
		<div className="flex flex-col">
			<p className="text-4xl ">Work In Progress</p>
			{from && from != '' ? (
				<p className="text-xxl ">Page {from} is under developement</p>
			) : (
				''
			)}
		</div>
	);
};

export default WorkInProgress;
