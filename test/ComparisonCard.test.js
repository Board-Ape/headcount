import React from 'react';
import { configure, shallow } from 'enzyme';
import ComparisonCard from '../src/Components/ComparisonCard';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() })

describe('Comparison card snapshot test', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<ComparisonCard />)

    expect(renderedApp).toMatchSnapshot();
  })
})
