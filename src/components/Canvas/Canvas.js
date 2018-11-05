import React, { Component } from 'react';
import './Canvas.css';

// needs to be class to support refs
// note: may not be needed after all *** when all code is refactored ***
class Canvas extends Component {
  componentDidMount() {
    // Send references to img and canvas elements back to App when created
    this.props.canvasMounted(this.refs.inputImage, this.refs.canvas);
    console.log('mounted');
  }

  render() {
    try {
      return (
        <div>
        <img
        className='width-80pc'
        ref='inputImage'
        src={this.props.imageUrl}
        alt=''
        crossOrigin='anonymous'
        style={this.props.showImg ? {display: 'inline'} : {display: 'none'}}
        />
        <canvas
        className='width-80pc'
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        ref='canvas'
        alt='picture with face(s) detected'
        style={this.props.showCanvas ? {display: 'inline'} : {display: 'none'}}
        />
        </div>
      );
    }
    catch (err) {
      console.log('error...', err);
    }
  }
}

export default Canvas;
