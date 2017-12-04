import React from 'react';
import '../css/Card.css';
import PropTypes from 'prop-types';

const Card = ({ location, data, id, updateCardToCompare, className }) => {
  let yearArray = Object.keys(data);
  let mappedYearArray = yearArray.map((year, index) => {
    if (Number(data[year]) > .5) {
      return  <p className="change-green" key={`${id}-${index}`}>
                <span className="info-span">{year}:</span>{data[year]}
              </p>;
    } else {
      return  <p key={`${id}-${index}`}>
                <span className="info-span">{year}:</span>{data[year]}
              </p>;
    }
  });

  return (
    <div onClick={() => updateCardToCompare(location)}
       className={className}>
      <h2>{location}</h2>
      <hr />
      <div className="card-info-block">
        {mappedYearArray}
      </div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.number,
  location: PropTypes.string,
  updateCardToCompare: PropTypes.func
};

export default Card;
