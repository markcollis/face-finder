import React, { Component, createRef } from 'react';
import ParticleAnimation from 'react-particle-animation';
import * as faceapi from 'face-api.js';

import DetectionResults from './components/DetectionResults/DetectionResults';
import ImageDropzone from './components/ImageDropzone/ImageDropzone';
import ImageFaceDetectForm from './components/ImageFaceDetectForm/ImageFaceDetectForm';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import InputImage from './components/InputImage/InputImage';
import Navigation from './components/Navigation/Navigation';
import OutputCanvas from './components/OutputCanvas/OutputCanvas';
import Profile from './components/Profile/Profile';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

import './App.css';
import { CORS_PROXY_URI, FACE_FINDER_API_URI } from './config';

const initialState = {
  canvasHeight: 0,
  canvasWidth: 0,
  detections: [],
  downloadUrl: '',
  imageUrl: '',
  input: '',
  inputSize: 416,
  isSignedIn: false,
  route: 'SignIn',
  scoreThreshold: 0.5,
  showCanvas: false,
  showDetailedResults: false,
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
    this.inputImageRef = createRef();
    this.outputCanvasRef = createRef();
  }

  async componentDidMount() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
    // console.log('Face detection models loaded.');
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
    const { input } = this.state;
    this.setState({ imageUrl: '' }, () => { // reset to avoid detecting width of previous image
      this.setState({ imageUrl: input }, () => {
        const checkWidth = this.inputImageRef.current.width;
        if (checkWidth === 0) {
          const updatedUrl = `${CORS_PROXY_URI}/${input}`;
          this.setState({ imageUrl: updatedUrl }, () => {
            // console.log('using CORS proxy', updatedUrl);
          });
        }
        this.setState({
          detections: [],
          showImg: true,
          showCanvas: false,
        });
      });
    });
  }

  onDropFile = (files) => {
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    this.setState({
      detections: [],
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

  detectFaces = () => {
    const {
      inputSize,
      scoreThreshold,
      withScore,
    } = this.state;
    this.setState({
      canvasHeight: this.inputImageRef.current.height,
      canvasWidth: this.inputImageRef.current.width,
    });
    this.runDetector({
      img: this.inputImageRef.current,
      canvas: this.outputCanvasRef.current,
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
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // console.log('Detections:', detections);
    // console.log('Resized:', resizedDetections);
    this.setState({ detections: resizedDetections });
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    faceapi.draw.drawDetections(canvas, resizedDetections, withScore);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    this.outputCanvasRef.current.toBlob((blob) => {
      const downloadUrl = URL.createObjectURL(blob);
      this.setState({ downloadUrl, showImg: false, showCanvas: true }, () => {
        window.scrollTo({ top: document.body.clientHeight, behavior: 'smooth' });
      });
    }, 'image/png');

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

  handleDetailedResultsButtonClick = () => {
    const { showDetailedResults } = this.state;
    this.setState({ showDetailedResults: !showDetailedResults });
  }

  render() {
    const {
      canvasHeight,
      canvasWidth,
      detections,
      downloadUrl,
      imageUrl,
      inputSize,
      isSignedIn,
      route,
      scoreThreshold,
      showCanvas,
      showDetailedResults,
      showImg,
      user,
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
        <InputImage
          ref={this.inputImageRef}
          imageUrl={imageUrl}
          showImg={showImg}
        />
        <OutputCanvas
          ref={this.outputCanvasRef}
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          showCanvas={showCanvas}
        />
        <DetectionResults
          detections={detections}
          downloadUrl={downloadUrl}
          handleDetailedResultsButtonClick={this.handleDetailedResultsButtonClick}
          showCanvas={showCanvas}
          showDetailedResults={showDetailedResults}
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
