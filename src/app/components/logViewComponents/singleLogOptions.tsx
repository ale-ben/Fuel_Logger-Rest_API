import { Button } from '@nextui-org/button';
import { BiEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

const SingleLogOptions = () => {
	return (
		<div className="flex flex-row justify-evenly w-full">
			<Button isIconOnly color="primary" className="w-10">
				<BiEdit className="text-xl" />
			</Button>
			<Button isIconOnly color="danger" className="w-10">
				<BsTrash className="text-xl" />
			</Button>
		</div>
	);
};

export default SingleLogOptions;
