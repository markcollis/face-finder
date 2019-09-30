import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ name, entries }) => {
  return (
    <div className="white f3">
      {`So far, ${name}, you have looked for faces in `}
      <span className="f2">{entries}</span>
      {(entries === '1') ? ' image.' : ' images.'}
    </div>
  );
};
Rank.propTypes = {
  name: PropTypes.string.isRequired,
  entries: PropTypes.string.isRequired,
};

export default Rank;
