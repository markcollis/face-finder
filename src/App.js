import React, { Component } from 'react';
import ParticleAnimation from 'react-particle-animation';
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

const initialState = {
  input: '',
  imageUrl: '',
  scoreThreshold: 0.5,
  inputSize: 416,
  showImg: true,
  showCanvas: true,
  inputImageElement: {},
  outputCanvasElement: {},
  canvasWidth: 0,
  canvasHeight: 0,
  filePreview: {},
  withScore: true,
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  async componentDidMount() {
    await faceapi.loadTinyFaceDetectorModel('/models');
    // await faceapi.loadFaceLandmarkModel('/models');
    await console.log('face detection model loaded');
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
  }

  onUrlButtonSubmit = () => {
    const corsPrefix = 'http://localhost:8080/';
    console.log('click submit button');
    this.setState({imageUrl: this.state.input}, () => {
      console.log('callback imageUrl: ', this.state.imageUrl);
      const checkWidth = this.state.inputImageElement.width;
      console.log('width:', checkWidth);
      if (checkWidth === 0) {
        const updatedUrl = corsPrefix + this.state.input;
        this.setState({imageUrl: updatedUrl }, () => {
          console.log('using CORS proxy');
        });
      }
      this.setState({showImg: true, showCanvas: false});
      // offer a CORS proxy alternative (https://cors-anywhere.herokuapp.com)
      // or local - currently localhost:8080
    });
  }

  onDropFile = (files) => {
    console.log('file dropped');
    console.log(files);
    const file = files[0];
    console.log(file);
    this.setState({
      filePreview: URL.createObjectURL(file)
    }, () => {
      this.setState({imageUrl: this.state.filePreview})
      this.setState({showImg: true, showCanvas: false});
    });
  }

  onIncreaseInputSize = () => {
    console.log('+ clicked');
    const newInputSize = Math.min((this.state.inputSize + 96), 608);
    this.setState({inputSize: newInputSize});
  }

  onDecreaseInputSize = () => {
    console.log('- clicked');
    const newInputSize = Math.max((this.state.inputSize - 96), 224);
    this.setState({inputSize: newInputSize});
  }

  onIncreaseThreshold = () => {
    console.log('+ clicked');
    const newScoreThreshold = Math.min(faceapi.round(this.state.scoreThreshold + 0.1), 1.0);
    this.setState({scoreThreshold: newScoreThreshold});
  }

  onDecreaseThreshold = () => {
    console.log('- clicked');
    const newScoreThreshold = Math.max(faceapi.round(this.state.scoreThreshold - 0.1), 0.1);
    this.setState({scoreThreshold: newScoreThreshold});
  }

  canvasMounted = (inputImageElement, outputCanvasElement) => {
    console.log('output image and canvas mounted');
    this.setState({inputImageElement: inputImageElement});
    this.setState({outputCanvasElement: outputCanvasElement});
  }

  detectFaces = () => {
    console.log('click detect faces');
    const { inputImageElement, outputCanvasElement, inputSize, scoreThreshold, withScore } = this.state;
    this.setState({canvasWidth: inputImageElement.width});
    this.setState({canvasHeight: inputImageElement.height});
    this.runDetector(inputImageElement, outputCanvasElement, inputSize, scoreThreshold, withScore);
  }

  async runDetector(img, canvas, inputSize, minScore, withScore) {
    const detectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: inputSize, scoreThreshold: minScore });
    const detections = await faceapi.detectAllFaces(img, detectorOptions);
    console.log(detections);
    const detectionsForSize = await detections.map(det => det.forSize(img.width, img.height));
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    await faceapi.drawDetection(canvas, detectionsForSize, withScore);
    this.setState({showImg: false, showCanvas: true});

    // landmarks trial - not working (type error in drawLandmarks.js)
    // const detectionsWithLandmarks = await faceapi.detectAllFaces(img, detectorOptions).withFaceLandmarks();
    // console.log(detectionsWithLandmarks);
    // const detectionsWithLandmarksForSize = await detectionsWithLandmarks.map(det => det.forSize(img.width, img.height));
    // const currentWidth = img.width;
    // const currentHeight = img.height;
    // img.style.display = 'none';
    // const ctx = canvas.getContext('2d');
    // ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
    // await faceapi.drawLandmarks(canvas, detectionsWithLandmarks, { drawLines: true});
    // canvas.style.display = 'inline';

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
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'SignIn') {
      this.setState(initialState);
    } else if (route === 'Main') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, inputSize, scoreThreshold, imageUrl, canvasWidth, canvasHeight, showImg, showCanvas } = this.state;
    return (
      <div className="App">
        <ParticleAnimation
          numParticles={100}
          lineWidth={3}
          particleSpeed={0.5}
          particleRadius={1}
          interactive={false}
          background={{ r: 51, g: 102, b: 153, a: 255 }}
          color={{ r: 255, g: 255, b: 255, a:255 }}
          className="particles"
        />
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
                inputSize={inputSize}
                onIncreaseInputSize={this.onIncreaseInputSize}
                onDecreaseInputSize={this.onDecreaseInputSize}
                scoreThreshold={scoreThreshold}
                onIncreaseThreshold={this.onIncreaseThreshold}
                onDecreaseThreshold={this.onDecreaseThreshold}
              />
              <Canvas
                canvasMounted={this.canvasMounted}
                imageUrl={imageUrl}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                showImg={showImg}
                showCanvas={showCanvas}
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
