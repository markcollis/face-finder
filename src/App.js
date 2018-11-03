import React, { Component } from 'react';
import Particles from 'react-particles-js';
import * as faceapi from 'face-api.js';

import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageDropzone from './components/ImageDropzone/ImageDropzone';
import ImageFaceDetectForm from './components/ImageFaceDetectForm/ImageFaceDetectForm';
import Canvas from './components/Canvas/Canvas';

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 32,
      density: {
        enable: true,
        value_area: 512
      }
    },
    move: {
      enable: true,
      speed: 4,
      out_mode: 'bounce'
    },
    size: {
      value: 5,
      random: false
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
      withScore: true,
      inputImageElement: {},
      outputCanvasElement: {},
      dragDropFile: [],
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  async componentDidMount() {
    // fetch('http://localhost:3001')
    // .then(response => response.json())
    // .then(console.log);
    await faceapi.loadFaceDetectionModel('/models');
    await console.log('face detection model loaded');
    // console.log('models commented out');
  }

  loadUser = (data) => {
    console.log(data);
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  onUrlInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log(event.target.value);
  }

  onUrlButtonSubmit = () => {
    console.log('click submit button');
    const el = this.state.inputImageElement;
    const canv = this.state.outputCanvasElement;
    this.setState({imageUrl: this.state.input}, () => {
      console.log('callback imageUrl: ', this.state.imageUrl);
      el.crossOrigin='anonymous';
      el.src=this.state.imageUrl;
      canv.style.display = 'none';
      el.style.display = 'inline';
      // need error handling: 1) invalid URL, 2) CORS restrictions.
      // offer a CORS proxy alternative (https://cors-anywhere.herokuapp.com)
    });
  }

  onDropFile = (file) => {
    console.log('file dropped');
    const el = this.state.inputImageElement;
    const canv = this.state.outputCanvasElement;
    this.setState({
      dragDropFile: file
    }, () => {
      el.src = this.state.dragDropFile[0].preview;
      canv.style.display = 'none';
      el.style.display = 'inline';
    });
  }

  onIncreaseThreshold = () => {
    console.log('+ clicked');
    const newMinConfidence = Math.min(faceapi.round(this.state.minConfidence + 0.1), 1.0);
    this.setState({minConfidence: newMinConfidence});
  }

  onDecreaseThreshold = () => {
    console.log('- clicked');
    const newMinConfidence = Math.max(faceapi.round(this.state.minConfidence - 0.1), 0.1);
    this.setState({minConfidence: newMinConfidence});
  }

  canvasMounted = (inputImageElement, outputCanvasElement) => {
    console.log('output image and canvas mounted');
    outputCanvasElement.style.display = 'none';
    this.setState({inputImageElement: inputImageElement});
    this.setState({outputCanvasElement: outputCanvasElement});
  }

  detectFaces = () => {
    console.log('click detect faces');
    const imageElementToProcess = this.state.inputImageElement;
    const canvasForResults = this.state.outputCanvasElement;
    const minConf = this.state.minConfidence;
    const maxRes = this.state.maxResults;
    const withScore = this.state.withScore;
    canvasForResults.width = imageElementToProcess.width;
    canvasForResults.height = imageElementToProcess.height;
    this.runDetector(imageElementToProcess, canvasForResults, minConf, maxRes, withScore);
  }

  async runDetector(img, canvas, minConf, maxRes, withScore) {
    const detections = await faceapi.ssdMobilenetv1(img, minConf, maxRes);
    console.log(detections);
    const detectionsForSize = await detections.map(det => det.forSize(img.width, img.height));
    const currentWidth = img.width;
    const currentHeight = img.height;
    img.style.display = 'none';
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
    await faceapi.drawDetection(canvas, detectionsForSize, withScore);
    canvas.style.display = 'inline';
    await fetch('http://localhost:3001/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      });
  }

  onRouteChange = (route) => {
    if (route === 'SignIn') {
      this.setState({isSignedIn: false});
    } else if (route === 'Main') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, minConfidence, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'Main'
          ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onUrlInputChange}
                onButtonSubmit={this.onUrlButtonSubmit}
              />
              <ImageDropzone
                onDropFile={this.onDropFile}
              />
              <ImageFaceDetectForm
                detectFaces={this.detectFaces}
                minConfidence={minConfidence}
                onIncreaseThreshold={this.onIncreaseThreshold}
                onDecreaseThreshold={this.onDecreaseThreshold}
              />
              <Canvas
                canvasMounted={this.canvasMounted}
                imageUrl={imageUrl}
              />
            </div>
          : (
            route === 'SignIn'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
