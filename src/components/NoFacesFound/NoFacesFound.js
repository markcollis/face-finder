import React from 'react';
import PropTypes from 'prop-types';

const NoFacesFound = ({ detectionsCount, showCanvas }) => {
  if (!showCanvas) return null;
  if (detectionsCount > 0) return null;
  return (
    <div className="ma4 mt0 centred">
      <div className="formwidth mw8 bg-white-30 pa3 br3 shadow-5">
        <p>
          Sorry, no faces were found in this picture. Try changing the input size and/or
          confidence threshold parameters.
        </p>
      </div>
    </div>
  );
};

NoFacesFound.propTypes = {
  detectionsCount: PropTypes.number.isRequired,
  showCanvas: PropTypes.bool.isRequired,
};

export default NoFacesFound;
