import React from 'react';
import './ImageDisplay.css';
import lenna from './Lennax2.png';

const ImageDisplay = ({minConfidence, onDecreaseThreshold, onIncreaseThreshold}) => {
  return (
    <div className='ma4 mt0'>
      <h2>{'face-api.js test'}</h2>
      <div className='centred'>
        <div className='form centred pa4 br3 shadow-5'>
          <label htmlFor='minConfidence'>Min Confidence:</label>
          <input disabled value={minConfidence} id='minConfidence' type='text' />
          <button onClick={onDecreaseThreshold}>-</button>
          <button onClick={onIncreaseThreshold}>+</button>
        </div>
      </div>
      <div className='centred'>
        <button className='grow f4 link ph3 pv2 dib white bg-dark-blue'>Test face detection</button>
      </div>
      <div>
        <img className='mw-100' id='inputImg' src={lenna} alt='' />
        <canvas id='overlay' />
      </div>
    </div>

    // <div className='ma4 mt0'>
    //   <p className='f3'>
    //     {'This Magic Brain will detect faces in your pictures. Give it a try!'}
    //   </p>
    //   <div className='centred'>
    //     <div className='form centred pa4 br3 shadow-5'>
    //       <input className='f4 pa2 w-70 centred' type='text' onChange={onInputChange} />
    //       <button
    //         className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue'
    //         onClick={onButtonSubmit}
    //         >Detect</button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ImageDisplay;
