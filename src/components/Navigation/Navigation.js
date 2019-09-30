import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({ isSignedIn, onRouteChange }) => {
  if (isSignedIn) {
    return (
      <nav className="nav-parent">
        <Logo />
        <span className="nav-menu">
          <div
            role="button"
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange('Main')}
            onKeyPress={() => onRouteChange('Main')}
            tabIndex={0}
          >
          Find Faces
          </div>
          <div
            role="button"
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange('Profile')}
            onKeyPress={() => onRouteChange('Profile')}
            tabIndex={0}
          >
          Profile
          </div>
          <div
            role="button"
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange('SignIn')}
            onKeyPress={() => onRouteChange('SignIn')}
            tabIndex={0}
          >
          Sign Out
          </div>
        </span>
      </nav>
    );
  }
  return (
    <nav className="nav-parent">
      <Logo />
      <span className="nav-menu">
        <div
          role="button"
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange('SignIn')}
          onKeyPress={() => onRouteChange('SignIn')}
          tabIndex={0}
        >
        Sign In
        </div>
        <div
          role="button"
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange('Register')}
          onKeyPress={() => onRouteChange('Register')}
          tabIndex={0}
        >
        Register
        </div>
      </span>
    </nav>
  );
};
Navigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  onRouteChange: PropTypes.func.isRequired,
};

export default Navigation;
