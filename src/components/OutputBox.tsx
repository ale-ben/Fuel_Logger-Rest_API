import React from 'react'
import SingleDataPoint from './SingleDataPoint'

const OutputBox = () => {
  return (
	<div className='p-5 w-2/3 max-h-full h-full'>
		<div className="bg-[#f9fafb] rounded-lg grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-h-full overflow-scroll">
			< SingleDataPoint />
			< SingleDataPoint />
			< SingleDataPoint />
			< SingleDataPoint />
			< SingleDataPoint />
			< SingleDataPoint />
			< SingleDataPoint />
		</div>
	</div>
  )
}

export default OutputBox