import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const OutputCanvas = forwardRef((props, ref) => {
  const { canvasHeight, canvasWidth, showCanvas } = props;
  return (
    <canvas
      width={canvasWidth}
      height={canvasHeight}
      ref={ref}
      alt="picture with face(s) detected"
      style={showCanvas ? { display: 'inline' } : { display: 'none' }}
    />
  );
});

OutputCanvas.propTypes = {
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  showCanvas: PropTypes.bool.isRequired,
};

export default OutputCanvas;
