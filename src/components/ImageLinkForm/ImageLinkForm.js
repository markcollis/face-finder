import React from 'react';
import PropTypes from 'prop-types';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="ma4 mt0">
      <div className="centred">
        <p className="f4 mw6">
          {'This page can detect faces in your pictures. Give it a try!'}
        </p>
      </div>
      <div className="centred">
        <div className="formwidth mw8 bg-white-30 centred pa3 br3 shadow-5">
          <input className="f5 pa2 w-75 centred" type="text" onChange={onInputChange} />
          <button
            type="button"
            className="w-25 grow f5 link ph3 pv2 dib white bg-dark-blue"
            onClick={onButtonSubmit}
          >
            Load image from URL
          </button>
        </div>
      </div>
    </div>
  );
};
ImageLinkForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onButtonSubmit: PropTypes.func.isRequired,
};

export default ImageLinkForm;
