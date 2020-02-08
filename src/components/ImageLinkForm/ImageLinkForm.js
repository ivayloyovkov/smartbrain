import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
	return(
		<section>
			<p className='f3 white'>
			{`This Magic Brain Will Detect Faces in Your Pictures.`}
			</p>
			<section className='center pa4 br3 shadow-5 form'>
				<input type='text' className='f4 pa2 w-75 center' onChange={onInputChange} />
				<button className='w-20 grow link f4 ph3 pv2 dib ba bg-transparent white bw' onClick={onPictureSubmit}>Detect</button>  
			</section>
		</section>
		);
}

export default ImageLinkForm;