import React from 'react';
import Tilt from 'react-tilt';
import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma3 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 200, width: 150 }} >
        <div className="Tilt-inner pa3"><img style={{paddingTop: '5px'}} src={logo} alt="logo: outline of brain in head"/></div>
      </Tilt>
    </div>
  );
}

export default Logo;
