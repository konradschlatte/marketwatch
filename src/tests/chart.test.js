let apiCall = require('../apiCall');
import Chart from '../Chart';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
global.fetch = require('jest-fetch-mock');

Enzyme.configure({ adapter: new Adapter() });

describe ('<Chart/> display', () => {
    let wrapper;
      beforeEach( () => {
        jest.mock('../apiCall', () => ({ apiCall: jest.fn() }));
        wrapper = shallow(<Chart uri= {''} legend = 'AAPL'/>)
      });
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });
    it('has a div element', () => {
      expect(wrapper.find('div').length).toBe(1);
    });
    it('has a state', () => {
        expect(wrapper.state().data).toEqual([]);
    });
    it('has a state - legend', () => {
      expect(wrapper.state().legend).toEqual('AAPL');
    });
    it('has a componentDidMount method', () => {
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });
    it('has a delete Button', () => {
      expect(wrapper.find('button').length).toBe(1);
    });
    // it('has a handleClick method', () => {
    //   expect(wrapper.instance().handleClick).toBeDefined();
    // });
});
describe ('apiCall', () => {
  beforeEach(() => {
     fetch.resetMocks()
   })
  it('calls the apiCall function once', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '1234' }));
    let wrapper = shallow(<Chart uri = {''}/>);
    expect(fetch.mock.calls.length).toEqual(1)
  });
});