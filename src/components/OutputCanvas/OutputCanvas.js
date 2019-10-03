import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const OutputCanvas = forwardRef((props, ref) => {
  const { canvasHeight, canvasWidth, showCanvas } = props;
  return (
    <div className="mw7 center">
      <canvas
        className="mw7"
        width={canvasWidth}
        height={canvasHeight}
        ref={ref}
        alt="picture with face(s) detected"
        style={showCanvas ? { display: 'inline' } : { display: 'none' }}
      />
    </div>
  );
});

OutputCanvas.propTypes = {
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  showCanvas: PropTypes.bool.isRequired,
};

export default OutputCanvas;
