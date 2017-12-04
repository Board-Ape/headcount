import React, { Component } from 'react';
import kinderData from '../../data/kindergartners_in_full_day_program.js';
import DistrictRepository from '../helper';
import Search from './Search';
import CardContainer from './CardContainer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      displayData: new DistrictRepository(kinderData).findAllMatches()
    }
  }

  searchDistrictCards = (string) => {
    const searchQuery = new DistrictRepository(kinderData).findAllMatches(string)
    this.setState({ displayData: searchQuery })
  }

  render() {
    return (
      <div className='app'>
        <h1>Head Count 2.0</h1>
        <Search searchDistrictCards={ this.searchDistrictCards } />
        <CardContainer displayData={ this.state.displayData } />
      </div>
    );
  }
}

export default App;
