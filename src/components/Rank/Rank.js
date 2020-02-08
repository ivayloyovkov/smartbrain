import React from 'react';

const Rank = ({name, entries}) => {
	return(
		<section>
			<div className='white f3'>{`${name}, your total number of processed images is `}</div>
			<div className='white f1'>{entries}</div>
		</section>
		);
}

export default Rank;