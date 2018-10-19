import React, { Component } from 'react';
import './Canvas.css';

// needs to be class to support refs
class Canvas extends Component {
  componentDidMount() {
    // Send references to img and canvas elements back to App when created
    this.props.canvasMounted(this.refs.inputImage, this.refs.canvas);
  }

  render() {
    return (
      <div>
        <img className='width-80pc' ref='inputImage' src='' alt='' />
        <canvas className='width-80pc' ref='canvas' alt='picture with face(s) detected' />
      </div>
    );
  }
}

export default Canvas;
