import React, { Component } from 'react';
import Card from './Card';

class CardContainer extends Component {
  render() {
    return(
      <div className='card-container'>
        {(this.props.displayData.map((card, index) => {
          return <Card
            key={index}
            id={index}
            data={card.data}
            location={card.location}
          />
        }))}
      </div>
    )
  }
}

export default CardContainer;
