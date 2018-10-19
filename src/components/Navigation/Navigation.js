import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo />
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange('SignIn')}
        >Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav className='flex justify-between'>
        <Logo />
        <span className='flex justify-between'>
          <p
            className='f3 link dim black underline pa3 pointer'
            onClick={() => onRouteChange('SignIn')}
          >Sign In</p>
          <p
            className='f3 link dim black underline pa3 pointer'
            onClick={() => onRouteChange('Register')}
          >Register</p>
        </span>
      </nav>
    );
  }
}

export default Navigation;
