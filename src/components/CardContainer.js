import React, { Component } from 'react';
import Card from './Card';

class CardContainer extends Component {
  render() {
    return(
      <div>
        <h1>CardContainer</h1>
        {(this.props.displayData.findAllMatches().map((card, index) => {
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
