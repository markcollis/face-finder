import React from 'react';
import Tilt from 'react-tilt';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma3'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa3"><img style={{height: 70, width: 80}} src={logo} alt="logo: outline of brain in head"/></div>
      </Tilt>
    </div>
  );
}

export default Logo;
