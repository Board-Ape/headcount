import React from 'react';

const Card = ({ location, data, id }) => {
  const yearListArray = Object.keys(data).map((year, index) => {
    return <p key={`${id}-${index}`}>{year}<span> {data[year]}</span></p>
  })
  return(
    <div>
      <h1>{location}</h1>
      {yearListArray}
    </div>
  )
}


export default Card;
