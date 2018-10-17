import React from 'react';
import * as faceapi from 'face-api.js';
// import pic from './pic.jpg';
import lenna from './Lennax2.png';
// import $ from 'jquery';


const FRTest = () => {

  let minConfidence = 0.7;
  let result;
  console.log(this);

  let onIncreaseThreshold = () => {
    minConfidence = Math.min(faceapi.round(minConfidence + 0.1), 1.0)
    console.log(minConfidence);
    // $('#minConfidence').val(minConfidence)
    // updateResults()
  }

  let onDecreaseThreshold = () => {
    minConfidence = Math.max(faceapi.round(minConfidence - 0.1), 0.1)
    console.log(minConfidence);
    // $('#minConfidence').val(minConfidence)
    // updateResults()
  }

  async function init() {
    await faceapi.loadFaceDetectionModel('/models');
    console.log('models loaded');
  }

  async function updateResults() {
    // const inputImgEl = $('#inputImg').get(0);
    // console.log(inputImgEl);
    // const { width, height } = inputImgEl
    // const canvas = $('#overlay').get(0)
    // canvas.width = width
    // canvas.height = height

    // result = await faceapi.locateFaces(inputImgEl, minConfidence);
    // console.log('result calculated');
    // console.log(result);
    // faceapi.drawDetection('overlay', result.map(det => det.forSize(width, height)))
  }

  init();
  // updateResults();

  return (
    <div>
      <p>{'Face Recognition package test'}</p>

      <div>
        <div>
          <label htmlFor="minConfidence">Min Confidence:</label>
          <input disabled value="0.7" id="minConfidence" type="text" />
          <button onClick=''>-</button>
          <button onClick=''>+</button>
        </div>
        <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue'>Test face detection</button>
      </div>

      <img id='inputImg' src={lenna} alt='' />
      <canvas id='overlay' />

    </div>
  );
}

export default FRTest;
