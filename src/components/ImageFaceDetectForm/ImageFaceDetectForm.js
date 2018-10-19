import React from 'react';

const ImageFaceDetectForm = ({detectFaces, minConfidence, onDecreaseThreshold, onIncreaseThreshold}) => {
  return (
    <div className='ma4 mt0'>
      <div className='centred'>
        <div className='formwidth mw8 bg-white-30 centred pa3 br3 shadow-5'>
          <input
            className='w-40 bg-transparent black tc b--none'
            disabled
            type='text'
            value='Confidence Threshold'
          />
          <button
            className='w-10 f6 fw8'
            onClick={onDecreaseThreshold}
          >-</button>
          <input
            className='w-10 bg-transparent black tc b--none f6 fw8'
            disabled
            type='text'
            value={minConfidence}
          />
          <button
            className='w-10 f6 fw8'
            onClick={onIncreaseThreshold}
          >+</button>
          <button
            className='w-30 grow f5 link ph3 pv2 dib white bg-dark-blue'
            onClick={detectFaces}
          >Detect Faces</button>
        </div>
      </div>
    </div>
  );
}

export default ImageFaceDetectForm;
