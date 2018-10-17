import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Rank from './components/Rank/Rank';
// import FRTest from './components/FRTest/FRTest';
import * as faceapi from 'face-api.js';
import './App.css';
// import lenna from './Lennax2.png';
import Canvas from './components/Canvas/Canvas';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    move: {
      enable: true,
      speed: 8,
      out_mode: 'bounce'
    },
    size: {
      value: 6,
      random: true
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      minConfidence: 0.7,
      maxResults: 25,
      inputImageElement: {},
      outputCanvasElement: {}
    }
  }

  async componentDidMount() {
    await faceapi.loadFaceDetectionModel('/models');
    await console.log('models loaded');
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click submit button');
    const el = this.state.inputImageElement;
    this.setState({imageUrl: this.state.input}, () => {
      console.log('callback imageUrl: ', this.state.imageUrl);
      el.crossOrigin='anonymous';
      el.src=this.state.imageUrl;
      // need error handling: 1) invalid URL, 2) CORS restrictions.
      // offer a CORS proxy alternative (https://cors-anywhere.herokuapp.com)
    });
  }

  onIncreaseThreshold = () => {
    console.log('+ clicked');
    const newMinConfidence = Math.min(faceapi.round(this.state.minConfidence + 0.1), 1.0);
    this.setState({minConfidence: newMinConfidence});
    // console.log('new minConfidence: ', this.state.minConfidence);
  }

  onDecreaseThreshold = () => {
    console.log('- clicked');
    const newMinConfidence = Math.max(faceapi.round(this.state.minConfidence - 0.1), 0.1);
    this.setState({minConfidence: newMinConfidence});
    // console.log('new minConfidence: ', this.state.minConfidence);
  }

  canvasMounted = (inputImageElement, outputCanvasElement) => {
    console.log('canvas mounted!');
// outputCanvasElement.style.display = 'none';
    // console.log(inputImageElement);
    this.setState({inputImageElement: inputImageElement});
    // console.log(outputCanvas);
    this.setState({outputCanvasElement: outputCanvasElement});
  }

  detectFaces = () => {
    console.log('click detect faces');
    const imageElementToProcess = this.state.inputImageElement;
    const canvasForResults = this.state.outputCanvasElement;
    const minConf = this.state.minConfidence;
    const maxRes = this.state.maxResults;
    // console.log(imageElementToProcess);
    // console.log(canvasForResults);
    canvasForResults.width = imageElementToProcess.width;
    canvasForResults.height = imageElementToProcess.height;
    this.runDetector(imageElementToProcess, canvasForResults, minConf, maxRes);
  }

  async runDetector(img, canvas, minConf, maxRes) {
    const detections = await faceapi.ssdMobilenetv1(img, minConf, maxRes);
    console.log(detections);
    const detectionsForSize = await detections.map(det => det.forSize(img.width, img.height));
    const currentWidth = img.width;
    const currentHeight = img.height;
// img.style.display = 'none';

    // console.log(canvas.style.top);
    // console.log(img.height);
    // canvas.style.top = '-' + img.height + 'px';
    const ctx = canvas.getContext('2d');
    // console.log(ctx);
    ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
    await faceapi.drawDetection(canvas, detectionsForSize, {withScore: true});
// canvas.style.display = 'inline';
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        {
        // <Logo />
        }
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {
        // <FRTest />
        }
        <ImageDisplay
          detectFaces={this.detectFaces}
          imageUrl={this.state.imageUrl}
          minConfidence={this.state.minConfidence}
          onIncreaseThreshold={this.onIncreaseThreshold}
          onDecreaseThreshold={this.onDecreaseThreshold}
        />
        <Canvas
          canvasMounted={this.canvasMounted}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
