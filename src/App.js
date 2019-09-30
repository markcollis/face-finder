import React, { Component } from 'react';
import ParticleAnimation from 'react-particle-animation';
import * as faceapi from 'face-api.js';

import Canvas from './components/Canvas/Canvas';
import ImageDropzone from './components/ImageDropzone/ImageDropzone';
import ImageFaceDetectForm from './components/ImageFaceDetectForm/ImageFaceDetectForm';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

import './App.css';
import { CORS_PROXY_URI, FACE_FINDER_API_URI } from './config';

const initialState = {
  canvasHeight: 0,
  canvasWidth: 0,
  imageUrl: '',
  input: '',
  inputImageElement: {},
  inputSize: 416,
  isSignedIn: false,
  outputCanvasElement: {},
  route: 'SignIn',
  scoreThreshold: 0.5,
  showCanvas: true,
  showImg: false,
  withScore: true,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  async componentDidMount() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
    console.log('Face detection models loaded.');
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  }

  onUrlInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onUrlButtonSubmit = () => {
    const { input, inputImageElement } = this.state;
    this.setState({ imageUrl: input }, () => {
      // console.log('callback imageUrl: ', this.state.imageUrl);
      const checkWidth = inputImageElement.width;
      if (checkWidth === 0) {
        const updatedUrl = `${CORS_PROXY_URI}/${input}`;
        this.setState({ imageUrl: updatedUrl }, () => {
          // console.log('using CORS proxy', updatedUrl);
        });
      }
      this.setState({ showImg: true, showCanvas: false });
    });
  }

  onDropFile = (files) => {
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    this.setState({
      imageUrl,
      showImg: true,
      showCanvas: false,
    });
  }

  onIncreaseInputSize = () => {
    const { inputSize } = this.state;
    const newInputSize = Math.min((inputSize + 96), 608);
    this.setState({ inputSize: newInputSize });
  }

  onDecreaseInputSize = () => {
    const { inputSize } = this.state;
    const newInputSize = Math.max((inputSize - 96), 224);
    this.setState({ inputSize: newInputSize });
  }

  onIncreaseThreshold = () => {
    const { scoreThreshold } = this.state;
    const newScoreThreshold = Math.min(faceapi.round(scoreThreshold + 0.1), 1.0);
    this.setState({ scoreThreshold: newScoreThreshold });
  }

  onDecreaseThreshold = () => {
    const { scoreThreshold } = this.state;
    const newScoreThreshold = Math.max(faceapi.round(scoreThreshold - 0.1), 0.1);
    this.setState({ scoreThreshold: newScoreThreshold });
  }

  canvasMounted = ({ inputImageElement, outputCanvasElement }) => {
    this.setState({ inputImageElement, outputCanvasElement });
  }

  detectFaces = () => {
    // console.log('detecting faces');
    const {
      inputImageElement,
      outputCanvasElement,
      inputSize,
      scoreThreshold,
      withScore,
    } = this.state;
    this.setState({
      canvasHeight: inputImageElement.height,
      canvasWidth: inputImageElement.width,
    });
    this.runDetector({
      img: inputImageElement,
      canvas: outputCanvasElement,
      inputSize,
      scoreThreshold,
      withScore,
    });
  }

  onRouteChange = (route) => {
    if (route === 'SignIn') {
      this.setState(initialState);
    } else if (route === 'Main') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  }

  runDetector = async ({
    img,
    canvas,
    inputSize,
    scoreThreshold,
    withScore,
  }) => {
    const { user } = this.state;
    const { id } = user;
    const detectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
    const useTinyModel = true;
    const displaySize = { width: img.width, height: img.height };

    const detections = await faceapi
      .detectAllFaces(img, detectorOptions)
      .withFaceLandmarks(useTinyModel);
    console.log('Detections:', detections);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    faceapi.draw.drawDetections(canvas, resizedDetections, withScore);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    this.setState({ showImg: false, showCanvas: true });

    await fetch(`${FACE_FINDER_API_URI}/image`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(response => response.json())
      .then((count) => {
        this.setState(Object.assign(user, { entries: count }));
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }

  render() {
    const {
      user,
      isSignedIn,
      route,
      inputSize,
      scoreThreshold,
      imageUrl,
      canvasWidth,
      canvasHeight,
      showImg,
      showCanvas,
    } = this.state;

    const renderBackground = (
      <ParticleAnimation
        numParticles={100}
        lineWidth={3}
        particleSpeed={0.5}
        particleRadius={1}
        interactive={false}
        background={{
          r: 51,
          g: 102,
          b: 153,
          a: 255,
        }}
        color={{
          r: 255,
          g: 255,
          b: 255,
          a: 255,
        }}
        className="particles"
      />
    );
    const renderMain = (
      <div>
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm
          onInputChange={this.onUrlInputChange}
          onButtonSubmit={this.onUrlButtonSubmit}
        />
        <ImageDropzone onDropFile={this.onDropFile} />
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
    );
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {renderBackground}
        {(route === 'Main') ? renderMain : ''}
        {(route === 'Profile') ? <Profile user={user} /> : ''}
        {(route === 'SignIn') ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> : ''}
        {(route === 'Register') ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> : ''}
      </div>
    );
  }
}

export default App;
