import React from 'react';

import PropTypes from 'prop-types';

const Loading = function ({ width, height, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '50px'}
      height={height || '50px'}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

Loading.defaultProps = {
  width: '25px',
  height: '25px',
  className: null,
};

export default Loading;
