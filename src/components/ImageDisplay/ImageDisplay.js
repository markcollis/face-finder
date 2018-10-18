import React from 'react';
import './ImageDisplay.css';
// import lenna from './Lennax2.png';

const ImageDisplay = ({detectFaces, imageUrl, minConfidence, onDecreaseThreshold, onIncreaseThreshold}) => {
  return (
    <div className='ma4 mt0'>
      <div className='centred'>
        <div className='form centred pa3 br3 shadow-5'>
          <p className='ma2'>Min Confidence:</p>
          <input disabled value={minConfidence} id='minConfidence' type='text' className='w-10'/>
          <button onClick={onDecreaseThreshold} className='w-10'>-</button>
          <button onClick={onIncreaseThreshold} className='w-10'>+</button>
          <button
            className='w-30 grow f5 link ph3 pv2 dib white bg-dark-blue'
            onClick={detectFaces}
          >Detect Faces</button>
        </div>
      </div>
      {
      // <div>
      //   <img className='mw-100' id='inputImage' src={lenna} alt='' />
      //   <canvas id='overlay' />
      //   <img className='mw-100' id='urlImage' src={imageUrl} alt='' />
      // </div>
    }
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
