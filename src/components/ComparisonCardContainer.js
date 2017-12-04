import React from 'react';
import ComparisonCard from './ComparisonCard';
import Card from './Card.js';
import '../css/ComparisonCardContainer.css';
import PropTypes from 'prop-types';

class ComparisonCardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.comparisonCards.length === 2 && nextProps.comparisonCards !== this.props.comparisonCards) {
      this.props.populateComparisonCard(nextProps.comparisonCards[0].location, nextProps.comparisonCards[1].location);
    } else if (nextProps.comparisonCards.length !== 2 && nextProps.comparisonCards !== this.props.comparisonCards) {
      this.props.resetComparison();
    }
  }

  render() {
    if (this.props.comparison === null) {
      return (
        <div className="comparison-card-container-component">

          <div className="comparison-top">
          {(this.props.comparisonCards.map((card, index) => {
            return <Card location={card.location}
                             data={card.data}
                              key={index}
                               id={index}
              updateCardToCompare={this.props.updateCardToCompare}
                        className={'card-component highlighted'}
            />;
          }))}
          </div>
          <button onClick={ this.props.clearComparisons }
                className="clear-button">clear
          </button>
          <div className="comparison-center">
            <p className="instructions">select TWO districts<br />&larr; to compare &rarr;</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="comparison-card-container-component">
          <div className="comparison-top">
            {(this.props.comparisonCards.map((card, index) => {
              return <Card location={card.location}
                               data={card.data}
                                key={index}
                                 id={index}
                updateCardToCompare={this.props.updateCardToCompare}
                          className={'card-component highlighted'}
              />;
            }))}
          </div>
            <ComparisonCard loc1={this.props.comparison.loc1}
                            avg1={this.props.comparison.avg1}
                            loc2={this.props.comparison.loc2}
                            avg2={this.props.comparison.avg2}
                            compare={this.props.comparison.compare}
            />
          <button onClick={ this.props.clearComparisons }
            className="clear-button">clear
          </button>
        </div>
      );
    }
  }
}

ComparisonCardContainer.propTypes = {
  clearComparisons: PropTypes.func,
  comparison: PropTypes.object,
  comparisonCards: PropTypes.array,
  populateComparisonCard: PropTypes.func,
  resetComparison: PropTypes.func,
  updateCardToCompare: PropTypes.func
};

export default ComparisonCardContainer;
