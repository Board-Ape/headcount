import CardContainer from '../src/Components/CardContainer';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import DistrictRepository from '../src/helper';
import kinderData from '../data/kindergartners_in_full_day_program.js';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('CardContainer test', () => {

  it('should match the snapshot', () => {

    const mockCards = []
    const renderedApp = shallow(<CardContainer currentData={mockCards}/>)

    expect(renderedApp).toMatchSnapshot();
  })

  it('should render a card for each item in our data', () => {
    let info = new DistrictRepository(kinderData).findAllMatches()
    let renderedApp = shallow(<CardContainer currentData={info}
                                         comparisonCards={[]}  />)
    let cards = renderedApp.find('Card')

    expect(cards.getElements()[0].props.location).toEqual(info[0].location)
    expect(cards.getElements()[55].props.location).toEqual(info[55].location)
    expect(cards.getElements()[120].props.location).toEqual(info[120].location)
    expect(cards.getElements()[142].props.location).toEqual(info[142].location)

  })

  it('should give a data prop that corresponds with data in info', () => {
    let info = new DistrictRepository(kinderData).findAllMatches()
    let renderedApp = shallow(<CardContainer currentData={info}
                                         comparisonCards={[]}  />)
    let cards = renderedApp.find('Card')

    expect(cards.getElements()[0].props.data).toEqual(info[0].data)
    expect(cards.getElements()[10].props.data).toEqual(info[10].data)
    expect(cards.getElements()[120].props.data).toEqual(info[120].data)
    expect(cards.getElements()[140].props.data).toEqual(info[140].data)
  })
})
