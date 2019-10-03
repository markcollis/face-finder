import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputImage = forwardRef((props, ref) => {
  const { imageUrl, showImg } = props;
  return (
    <div className="mw7 center">
      <img
        ref={ref}
        src={imageUrl}
        alt="img"
        crossOrigin="anonymous"
        style={showImg ? { display: 'inline' } : { display: 'none' }}
        onLoad={() => {
          const offset = 200; // so that 'detect faces' button is visible
          const availableHeight = window.innerHeight;
          const imgBounds = ref.current.getBoundingClientRect();
          const target = (imgBounds.height > availableHeight - offset)
            ? imgBounds.top - offset
            : imgBounds.top;
          window.scrollTo({ top: target, behavior: 'smooth' });
        }}
      />
    </div>
  );
});

InputImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  showImg: PropTypes.bool.isRequired,
};

export default InputImage;
