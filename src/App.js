import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import Rank from './components/Rank/Rank';
// import FRTest from './components/FRTest/FRTest';
import * as faceapi from 'face-api.js';
import './App.css';

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
      minConfidence: 0.7
    }
  }

  async componentDidMount() {
    // await faceapi.loadFaceDetectionModel('/models');
    await console.log('models loaded');
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  onIncreaseThreshold = () => {
    console.log('+ clicked');
    const newMinConfidence = Math.min(faceapi.round(this.state.minConfidence + 0.1), 1.0);
    this.setState({minConfidence: newMinConfidence});
    console.log('new minConfidence: ', this.state.minConfidence);
  }

  onDecreaseThreshold = () => {
    console.log('- clicked');
    const newMinConfidence = Math.max(faceapi.round(this.state.minConfidence - 0.1), 0.1);
    this.setState({minConfidence: newMinConfidence});
    console.log('new minConfidence: ', this.state.minConfidence);
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {
        // <FRTest />
        }
        <ImageDisplay
          minConfidence={this.state.minConfidence}
          onIncreaseThreshold={this.onIncreaseThreshold}
          onDecreaseThreshold={this.onDecreaseThreshold}
        />
        {
        // <FaceRecognition />
        }
      </div>
    );
  }
}

export default App;
