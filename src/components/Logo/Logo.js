import React from 'react';
import Tilt from 'react-tilt';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma3'>
      <Tilt className='Tilt br2 shadow-2' options={{ max : 30 }} >
        <div className='pa3'>
          <img className='TiltImg' src={logo} alt='logo: outline of brain in head'/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
