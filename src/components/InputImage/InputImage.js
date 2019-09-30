import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputImage = forwardRef((props, ref) => {
  const { imageUrl, showImg } = props;
  return (
    <img
      ref={ref}
      src={imageUrl}
      alt="img"
      crossOrigin="anonymous"
      style={showImg ? { display: 'inline' } : { display: 'none' }}
    />
  );
});

InputImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  showImg: PropTypes.bool.isRequired,
};

export default InputImage;
