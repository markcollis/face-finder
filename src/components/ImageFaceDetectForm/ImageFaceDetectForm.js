import React from 'react';
import PropTypes from 'prop-types';

const ImageFaceDetectForm = ({
  detectFaces,
  inputSize,
  onDecreaseInputSize,
  onDecreaseThreshold,
  onIncreaseInputSize,
  onIncreaseThreshold,
  scoreThreshold,
}) => {
  return (
    <div className="ma4 mt0">
      <div className="centred">
        <div className="formwidth mw8 bg-white-30 centred pa3 br3 shadow-5">
          <p className="w-20 mv1 bg-transparent black tc b--none">
            <span>Input size</span>
            <br />
            <button
              type="button"
              className="w-20 f6 fw8"
              onClick={onDecreaseInputSize}
            >
            -
            </button>
            <span className="w-20 bg-transparent black tc b--none f6 fw8 pa2">{inputSize}</span>
            <button
              type="button"
              className="w-20 f6 fw8"
              onClick={onIncreaseInputSize}
            >
            +
            </button>
          </p>
          <p className="w-40 mv1 bg-transparent black tc b--none">
            <span>Confidence threshold</span>
            <br />
            <button
              type="button"
              className="w-10 f6 fw8"
              onClick={onDecreaseThreshold}
            >
            -
            </button>
            <span className="w-10 bg-transparent black tc b--none f6 fw8 pa2">{scoreThreshold}</span>
            <button
              type="button"
              className="w-10 f6 fw8"
              onClick={onIncreaseThreshold}
            >
            +
            </button>
          </p>
          <button
            type="button"
            className="w-30 grow f5 link ph2 pv2 dib white bg-dark-blue"
            onClick={detectFaces}
          >
          Detect Faces
          </button>
        </div>
      </div>
      <div className="centred">
        <p className="formwidth">
          A larger input size will increase processing time but is better at detecting
          smaller faces. A lower confidence threshold may identify more faces but with
          an increased risk of false positives.
        </p>
      </div>
    </div>
  );
};
ImageFaceDetectForm.propTypes = {
  detectFaces: PropTypes.func.isRequired,
  inputSize: PropTypes.number.isRequired,
  onDecreaseInputSize: PropTypes.func.isRequired,
  onDecreaseThreshold: PropTypes.func.isRequired,
  onIncreaseInputSize: PropTypes.func.isRequired,
  onIncreaseThreshold: PropTypes.func.isRequired,
  scoreThreshold: PropTypes.number.isRequired,
};

export default ImageFaceDetectForm;
