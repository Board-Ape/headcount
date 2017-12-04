import React from 'react';

const Card = ({ location, data, id }) => {
  const yearListArray = Object.keys(data).map((year, index) => {
    return <p key={`${id}-${index}`}>{year}: {data[year]}</p>
  })
  return(
    <div className='cards'>
      <h2>{location}</h2>
      {yearListArray}
    </div>
  )
}


export default Card;
