import React, { Component } from 'react';
import '../App.css';
import kinderData from '../../data/kindergartners_in_full_day_program.js';
import DistrictRepository from '../helper';
import Search from './Search';
import CardContainer from './CardContainer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      displayData: new DistrictRepository(kinderData)
    }
  }

  updateDisplayView = (buttonValue) => {
    this.setState({ displayData: buttonValue })
  }

  render() {
    return (
      <div>
        <Search />
        <CardContainer displayData={ this.state.displayData } />
      </div>
    );
  }
}

export default App;
