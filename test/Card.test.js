import React from 'react';
import { configure, shallow } from 'enzyme';
import Card from '../src/Components/Card';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('Card Tests', () => {
  it('should match the snapshot', () => {
    const card = { location: 'Turing', data: {} }
    const { location, data } = card
    const renderedApp = shallow(<Card
                            location={location}
                                data={data}  />)

   expect(renderedApp).toMatchSnapshot()
  })
})
