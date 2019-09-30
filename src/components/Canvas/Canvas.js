import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Canvas.css';

// needs to be class to support refs
class Canvas extends Component {
  componentDidMount() {
    const { canvasMounted } = this.props;
    // Send references to img and canvas elements back to App when created
    const { inputImage, canvas } = this.refs; // need to refactor refs
    canvasMounted({ inputImageElement: inputImage, outputCanvasElement: canvas });
  }

  render() {
    const {
      canvasHeight,
      canvasWidth,
      imageUrl,
      showCanvas,
      showImg,
    } = this.props;
    return (
      <div>
        <img
          className="width-80pc"
          ref="inputImage"
          src={imageUrl}
          alt="img"
          crossOrigin="anonymous"
          style={showImg ? { display: 'inline' } : { display: 'none' }}
        />
        <canvas
          className="width-80pc"
          width={canvasWidth}
          height={canvasHeight}
          ref="canvas"
          alt="picture with face(s) detected"
          style={showCanvas ? { display: 'inline' } : { display: 'none' }}
        />
      </div>
    );
  }
}
Canvas.propTypes = {
  canvasMounted: PropTypes.func.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  showCanvas: PropTypes.bool.isRequired,
  showImg: PropTypes.bool.isRequired,
};

export default Canvas;
