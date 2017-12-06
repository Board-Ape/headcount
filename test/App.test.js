import React from 'react';
import ReactDOM from 'react-dom';
import App from './../src/Components/App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DistrictRepository from './../src/helper';
import kinderData from './../data/kindergartners_in_full_day_program.js';

configure({ adapter: new Adapter() });

describe('App tests', () => {
  let renderedApp;

  beforeEach(() => {
    renderedApp = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
})

  it('should match snapshot', () => {
    expect(renderedApp).toMatchSnapshot();
  })

  it('Should render the correct components', () => {
  const foundCardContainer = renderedApp.find('CardContainer');
  const foundSearch = renderedApp.find('Search');
  const foundComparisonCardContainer = renderedApp.find('ComparisonCardContainer');

  expect(foundCardContainer.length).toEqual(1);
  expect(foundSearch.length).toEqual(1);
  expect(foundComparisonCardContainer.length).toEqual(1);
  })

  it('App should have a default state for comparison cards', () => {

    expect(renderedApp.state('comparisonCards')).toEqual([])
  })

  it('App should have a default state for comparison', () => {

    expect(renderedApp.state('comparison')).toEqual(null)
  })

  it('App should have a default state for the kinder data', () => {
    const newData =  new DistrictRepository(kinderData).findAllMatches()

    expect(renderedApp.state('data')).toEqual(newData)
  })

  it('should display number of cards according to search results', () => {
    let mountedApp = mount(<App/>)
    let input = mountedApp.find('input');

    input.simulate('change', {target: {value: 'br'} });
    expect(mountedApp.state('data').length).toEqual(4)
  })

  it('App state should change if cards are selected to be compared', () => {
    let mountedApp = mount(<App/>)
    let card = mountedApp.find('.card-component').at(1)

    expect(mountedApp.state('comparisonCards')).toEqual([])
    card.simulate('click')
    expect(mountedApp.state('comparisonCards').length).toEqual(1)
  })

  it('clear button should clear the comparisonCards array', () => {
    let mountedApp = mount(<App/>)
    let card1 = mountedApp.find('.card-component').at(1)
    let card2 = mountedApp.find('.card-component').at(2)
    let clearButton = mountedApp.find('.clear-button')
    let mockFunction = jest.fn()
    let mockData =  [{"data": {"2004": 0.24, "2005": 0.278, "2006": 0.337, "2007": 0.395, "2008": 0.536, "2009": 0.598, "2010": 0.64, "2011": 0.672, "2012": 0.695, "2013": 0.703, "2014": 0.741}, "location": "COLORADO"}, {"data": {"2004": 0.302, "2005": 0.267, "2006": 0.354, "2007": 0.392, "2008": 0.385, "2009": 0.39, "2010": 0.436, "2011": 0.489, "2012": 0.479, "2013": 0.488, "2014": 0.49}, "location": "ACADEMY 20"}]


    expect(mountedApp.state('comparisonCards')).toEqual([])
    card1.simulate('click')
    expect(mountedApp.state('comparisonCards').length).toEqual(1)
    card2.simulate('click')
    expect(mountedApp.state('comparisonCards').length).toEqual(2)
    clearButton.simulate('click')
    expect(mountedApp.state('comparisonCards')).toEqual(mockData)
  })

  it('comparison state should be null by default until there are two cards in the comparison card array', () => {
    let mountedApp = mount(<App/>)
    let card1 = mountedApp.find('.card-component').at(1)
    let card2 = mountedApp.find('.card-component').at(2)

    expect(mountedApp.state('comparison')).toEqual(null)
    card1.simulate('click')
    expect(mountedApp.state('comparison')).toEqual(null)
    card2.simulate('click')
    expect(mountedApp.state('comparison')).toEqual(
    { loc1: 'COLORADO',
      avg1: 0.53,
      loc2: 'ACADEMY 20',
      avg2: 0.407,
      compare: 1.302 })
  })
})
