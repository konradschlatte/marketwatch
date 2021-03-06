import apiCall from '../apiCall';
import Chart from '../Chart';
import Enzyme from 'enzyme';
import {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import helper from './helper';

jest.mock('react-chartjs-2', () => ({ Line: () => <div>LineChart</div> }));

Enzyme.configure({ adapter: new Adapter() });

describe ('<Chart/> display', () => {
    let wrapper;
      beforeEach( () => {

        wrapper = mount(<Chart uri= 'uri' legend = 'AAPL' ma1 = '10' ma2 = '10' />)
      });
    test('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });
    test('has a div element', () => {
      expect(wrapper.find('div').length).toBe(2);
    });
    test('has a delete Button', () => {
      expect(wrapper.find('button').length).toBe(1);
    });
    test('has a state', () => {
        expect(wrapper.state().data).toEqual([]);
    });
    test('has a componentDidMount method', () => {
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });
    test('can change state', () => {
        wrapper.setState({ data: [{ "open":165,"label":"hello", "ma1": 10, "ma2": 10 }] });
        expect(wrapper.state().data).toEqual([{ "open":165,"label":"hello", "ma1": 10, "ma2": 10 }]);
    });

});
describe('apiCall/componentDidmount' , () => {
    afterEach(() => {
      apiCall.call.mockClear();
    });
    test('the apiCall returns data', () => {
        expect.assertions(1);
        jest.spyOn(apiCall, 'call');
        apiCall.call.mockResolvedValue('peanut butter');
        return apiCall.call()
        .then(data => {
        expect(data).toBe('peanut butter');
      });
    });
    test('<Chart/> calls componentDidMount' , () => {
        const call = jest.spyOn(apiCall, 'call');
        call.mockResolvedValue('peanut butter');
        const wrapper = mount(<Chart uri= {'uri'} legend = 'AAPL'/>);
        const didMount = jest.spyOn(wrapper.instance(), 'componentDidMount')
        wrapper.instance().componentDidMount();
        expect(didMount.mock.calls.length).toEqual(1);
    });
    test('<Chart/> calls apiCall' , () => {
        const api = jest.spyOn(apiCall, 'call')
        mount(<Chart uri= {'uri'} legend = 'AAPL'/>);
        expect(api.mock.calls.length).toEqual(1);
    });
});
