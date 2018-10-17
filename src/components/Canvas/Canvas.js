import React, { Component } from 'react';
import './Canvas.css';
import lenna from '../../Lennax2.png';

class Canvas extends Component {
  componentDidMount() {
    // const canvasElement = this.refs.canvas;
    // const inputImageElement = this.refs.inputImage;
    // console.log(canvasElement);
    // console.log(inputImageElement);
    this.props.canvasMounted(this.refs.inputImage, this.refs.canvas);
  }

  render() {
    return (
      <div>
        <img className='baseimage' ref='inputImage' src={lenna} alt='' />
        <canvas className='overlay' ref='canvas' />
      </div>
    );
  }
}

export default Canvas;
