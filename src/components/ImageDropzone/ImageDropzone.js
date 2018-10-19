import React from 'react';
import ReactDropzone from 'react-dropzone';

const ImageDropzone = ({onDropFile}) => {

  return (
    <div className='ma4 mt0'>
      <div className='centred'>
        <div className='formwidth mw8 bg-white-30 centred pa3 br3 shadow-5'>
          <ReactDropzone
            accept='image/*'
            className='w-90 bw1 br3 b--dashed b--dark-blue'
            multiple={false}
            onDrop={(file) => onDropFile(file)}
          >
            <p>Drag and drop an image,<br />or click to open a local image file</p>
          </ReactDropzone>
        </div>
      </div>
    </div>
  );
}

export default ImageDropzone;
