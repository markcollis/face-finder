import React from 'react';
import ReactDropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const ImageDropzone = ({ onDropFile }) => {
  return (
    <div className="ma4 mt0">
      <div className="centred">
        <div className="formwidth mw8 bg-white-30 centred pa3 br3 shadow-5">
          <ReactDropzone onDrop={file => onDropFile(file)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'w-90 bw1 br3 b--dashed b--dark-blue' })}>
                <input {...getInputProps({ accept: 'image/*', multiple: false })} />
                <p>
                  Drag and drop an image,
                  <br />
                  or click to open a local image file
                </p>
              </div>
            )}
          </ReactDropzone>
        </div>
      </div>
    </div>
  );
};
ImageDropzone.propTypes = {
  onDropFile: PropTypes.func.isRequired,
};

export default ImageDropzone;
