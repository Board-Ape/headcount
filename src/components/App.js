import React, { Component } from 'react';
import DistrictRepository from '../helper';
import kinderData from '../../data/kindergartners_in_full_day_program.js';
import Search from './Search';
import CardContainer from './CardContainer';
import ComparisonCardContainer from './ComparisonCardContainer';
import '../helper';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: new DistrictRepository(kinderData).findAllMatches(),
      comparisonCards: [],
      comparison: null
    };
  }

  updateCardToCompare = (card) => {
    const currentComparison = this.state.comparisonCards;
    const newComparison = new DistrictRepository(kinderData).findByName(card);
    let foundCard = this.state.comparisonCards.find(card => {
      return card.location === newComparison.location;
    });

    if (!foundCard) {
      foundCard = {location: ''};
    }
    if (foundCard.location === newComparison.location) {
      const addCard = this.state.comparisonCards.filter(card => {
        return card.location !== newComparison.location;
      });

      this.setState({comparisonCards: addCard});
      this.toggleErrorMessage('off');

    } else {

      this.manageComparisonLength(card, currentComparison, newComparison);
    }
  }

  toggleErrorMessage(onOff) {
    let errMes;

    if (onOff === 'on') {
      errMes = 'Please clear comparisons first!';
    } else {
      errMes = '';
    }
    document.querySelector('.error-message').innerText = errMes;
  }

  manageComparisonLength(card, currentComparison, newComparison) {
    if (this.state.comparisonCards.length === 2) {
      this.toggleErrorMessage('on');
    } else {
      this.setState({comparisonCards: [...currentComparison, newComparison]});
    }
  }

  searchCards = (string) => {
    const results = new DistrictRepository(kinderData).findAllMatches(string);

    this.setState({data: results});
  }

  clearComparisons = () => {
    this.setState({data: new DistrictRepository(kinderData).findAllMatches(), comparisonCards: [], comparison: null});
    document.querySelector('input').value = '';
    this.toggleErrorMessage('off');
  }

  populateComparisonCard = (loc1, loc2) => {
    const comparison = new DistrictRepository(kinderData).compareDistrictAverages(loc1, loc2);

    this.setState({comparison: comparison});
  }

  resetComparison = () => {
    this.setState({comparison: null});
  }

  render() {
    return (
      <div className="app-component">
        <Search search={this.searchCards} />
        <ComparisonCardContainer comparisonCards={this.state.comparisonCards}
          comparison={this.state.comparison}
          populateComparisonCard={this.populateComparisonCard}
          updateCardToCompare={this.updateCardToCompare}
          clearComparisons={this.clearComparisons}
          resetComparison={this.resetComparison}
        />
        <h4 className="error-message"></h4>
        <CardContainer currentData={this.state.data}
               updateCardToCompare={this.updateCardToCompare}
                   comparisonCards={this.state.comparisonCards}
        />
      </div>
    );
  }
}

export default App;
