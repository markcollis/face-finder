import React from 'react';
import PropTypes from 'prop-types';

const DetailedResult = ({ detection }) => {
  const { detection: innerDetection, landmarks } = detection;
  const {
    box,
    imageHeight,
    imageWidth,
    score,
  } = innerDetection;
  const percentConfidence = Math.floor(score * 100);
  const {
    bottom,
    left,
    right,
    top,
  } = box;
  const { positions } = landmarks;
  const renderLandmarks = positions.map(position => `[${position.x.toFixed(2)},${position.y.toFixed(2)}]`).join(', ');

  return (
    <li className="f6 pv2 tl mt1 mb1 bl-0 br-0 bb-0 b--dotted b--black-30">
      <div className="pv1">
        {`A face was detected with ${percentConfidence}% confidence between [${left.toFixed()},${top.toFixed()}] and [${right.toFixed()},${bottom.toFixed()}] in this ${imageWidth} x ${imageHeight} image.`}
      </div>
      <div className="pv1">
        {`The 68 landmark points that highlight the edge of the face, eyes, nose and mouth are: ${renderLandmarks}.`}
      </div>
    </li>
  );
};

DetailedResult.propTypes = {
  detection: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailedResult;
