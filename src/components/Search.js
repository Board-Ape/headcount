import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: this.updateSearchInput
    }
  }

  updateSearchInput = (event) => {
    const searchString = event.target.value
    this.props.searchDistrictCards(searchString)
  }

  render() {
    return(
      <div>
        <input placeholder='Search Districts'
                onChange={ this.state.searchInput } />
      </div>
    )
  }
}

export default Search;
