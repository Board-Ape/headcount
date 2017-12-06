import React from 'react';
import Search from './../src/Components/Search';
import { configure, shallow, mount } from 'enzyme';
import App from './../src/Components/App';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() })

describe('Search Tests', () => {
  let renderedApp = shallow(<Search />)

  it('should have a search container', () => {
    let searchContainer = renderedApp.find('.search-container');

    expect(searchContainer.length).toEqual(1);
  })

  it('should have an input', () => {
    let input = renderedApp.find('input');

    expect(input.length).toEqual(1);
  })

  it('should update number of cards in the array based on input', () => {
    let mountedApp = mount(<App/>)
    let input = mountedApp.find('input');

    expect(mountedApp.state('data').length).toEqual(181)
    input.simulate('change', {target: {value: 'br'} });
    expect(mountedApp.state('data').length).toEqual(4)
  })
})
