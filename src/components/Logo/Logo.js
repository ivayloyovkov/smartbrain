import React from 'react';
import Tilt from 'react-tilt'
import LogoImg from './logo2.png';

const Logo = () => {
    return (
        <section className='ma4 mt0 center'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 200, width: 200 }} >
			 <div className="Tilt-inner"><img src={LogoImg} alt="logo"/></div>
			</Tilt>
		</section>
    );
}

export default Logo;