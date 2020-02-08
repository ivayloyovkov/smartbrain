import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <section className='center ma'>
			<section className='absolute mt2'>
				<img id="inputimage" className='pa3' src={imageUrl} alt="uploaded" width='500px' height='auto'/>
			<section id="faceBorder" className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.botRow, left: box.leftCol}}>
			</section>
			</section>
		</section>
    );
}

export default FaceRecognition;