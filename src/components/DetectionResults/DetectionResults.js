import React from 'react';
import PropTypes from 'prop-types';

import DetailedResult from '../DetailedResult/DetailedResult';
import img68Points from './68points.jpg';

const DetectionResults = ({
  detections,
  downloadUrl,
  handleDetailedResultsButtonClick,
  showCanvas,
  showDetailedResults,
}) => {
  if (!showCanvas) return null;
  const detectionsCount = detections.length;
  if (detectionsCount === 0) return null;

  const renderDetailedResultsButton = (detectionsCount > 0)
    ? (
      <div>
        <button
          type="button"
          className="f5 ph3 pv2 dib white bg-dark-blue"
          onClick={handleDetailedResultsButtonClick}
        >
          {(showDetailedResults) ? 'Hide detailed results' : 'Show detailed results'}
        </button>
      </div>
    )
    : '';
  const detailedResultsArray = (detectionsCount > 0)
    ? detections.map((detection) => {
      const { score } = detection.detection;
      return <DetailedResult key={score} detection={detection} />;
    })
    : [];
  const renderDetailedResults = (showDetailedResults && detectionsCount > 0)
    ? (
      <div className="pa3">
        <ul className="list pl0">
          {detailedResultsArray}
        </ul>
        <div className="pv2 tl mt1 mb1 bl-0 br-0 bb-0 b--dotted b--black-30">
          <img src={img68Points} alt="layout of the 68 points" />
          <p className="f6 i">(picture credit: Intelligent Behaviour Understanding Group, Imperial College)</p>
          <p>
            This is where the 68 facial landmarks, which are commonly used to train and compare
            face recognition algorithms, are located on a generic face.
          </p>
        </div>
      </div>
    )
    : '';

  return (
    <div className="ma4 mt3 centred">
      <div className="formwidth mw8 bg-white-30 pa3 br3 shadow-5">
        <p className="f4">{`${detectionsCount} ${(detectionsCount === 1) ? 'face was' : 'faces were'} found.`}</p>
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          Download your image with the faces highlighted here
        </a>
        <p className="f6 i">
          (if the link appears to open a new tab which is then closed immediately, this is
          probably due to an ad-blocking extension)
        </p>
        {renderDetailedResultsButton}
        {renderDetailedResults}
      </div>
    </div>
  );
};

DetectionResults.propTypes = {
  detections: PropTypes.arrayOf(PropTypes.object).isRequired,
  downloadUrl: PropTypes.string.isRequired,
  handleDetailedResultsButtonClick: PropTypes.func.isRequired,
  showCanvas: PropTypes.bool.isRequired,
  showDetailedResults: PropTypes.bool.isRequired,
};

export default DetectionResults;
