import apiCall from '../apiCall';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
global.fetch = require('jest-fetch-mock');

Enzyme.configure({ adapter: new Adapter() });

 describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });
  test('calls the API and returns data ', () => {
    fetch.mockResponseOnce(JSON.stringify({data: 12345 }));

    apiCall.call('google')
    .then(res => res.json())
    .then(res => {
    expect(res.data).toEqual(12345);
    })
    .catch( (error) => {
       return 0
    });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('google');
  });
  test('handles a failed API call', () => {
    fetch.mockRejectOnce('error');

    apiCall.call('google')
    .then(res => res.json())
    .then(res => {
    expect(res.data).toEqual(0);
    })
    .catch( (error) => {
       return 0
    });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('google');
  });
});
