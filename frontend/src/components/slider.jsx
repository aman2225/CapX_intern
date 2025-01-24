// import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const C = ({ start }) => {
  return (
    <Carousel interval={1300} fade>
      {start.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// Add PropTypes validation
C.propTypes = {
  start: PropTypes.arrayOf(PropTypes.string).isRequired, // `start` must be an array of strings and is required
};

export default C;
