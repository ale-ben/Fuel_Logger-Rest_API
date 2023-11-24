import { ScrollShadow } from '@nextui-org/scroll-shadow';
import SingleLog from './logViewComponents/singleLog';

const LogViewComponent = () => {
	return (
		<div className="m-5">
			<ScrollShadow className="h-[600px] w-full">
				<div className="flex flex-row flex-wrap gap-2">
					{[...Array(50)].map((_, i) => (
						<SingleLog key={i} />
					))}
				</div>
			</ScrollShadow>
		</div>
	);
};

export default LogViewComponent;
