import React, {Component} from 'react';
import Card from './Card.js';
import '../css/CardContainer.css';
import PropTypes from 'prop-types';


export default class CardContainer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="card-container-component">
      {(this.props.currentData.map((card, index)=> {
        let locs = this.props.comparisonCards.map(card => card.location);

        return <Card location={card.location}
                         data={card.data}
                          key={index}
                           id={index}
          updateCardToCompare={this.props.updateCardToCompare}
                    className={locs.includes(card.location) ? 'card-component highlighted' : 'card-component'}
        />;
      }))}
      </div>
    );
  }
}

CardContainer.propTypes = {
  comparisonCards: PropTypes.array,
  currentData: PropTypes.array,
  updateCardToCompare: PropTypes.func
};
