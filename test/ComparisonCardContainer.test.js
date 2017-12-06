import React from 'react';
import ComparisonCardContainer from '../src/Components/ComparisonCardContainer';
import { configure, shallow, mount } from 'enzyme';
import kinderData from '../data/kindergartners_in_full_day_program.js';
import DistrictRepository from '../src/helper';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() })

describe('Card Container Tests', () => {
  let district = new DistrictRepository(kinderData)
  let info = district.cleanData

  let mockComparisonCards = [{
    location: 'Colorado',
    data: {2003: 0.53}},
    {location: 'New York', data: {2009: 0.34}}]

  let mockComparison = {
    loc1: 'Colorado',
    avg1: 0.34,
    loc2: 'New York',
    avg2: 0.55,
    compare: 0.67
  }

  let wrapper = shallow(<ComparisonCardContainer
    comparison={mockComparison}
    comparisonCards={mockComparisonCards} />);

  let cards = wrapper.find('Card');
  let mountContainer = mount(<ComparisonCardContainer
    comparison={mockComparison}
    comparisonCards={mockComparisonCards} />);


it('should render a comparison card if app passes a value into comparison', () => {
  let comparisonCard = wrapper.find('ComparisonCard')

  expect(comparisonCard.length).toEqual(1)
})

it('should not render a comparison card if there is no value in comparison', () => {
  let renderedApp = shallow(<ComparisonCardContainer
    comparison={null}
    comparisonCards= {[]} />);

  let noComparisonCard = renderedApp.find('ComparisonCard');

  expect(noComparisonCard.length).toEqual(0)
})

})
