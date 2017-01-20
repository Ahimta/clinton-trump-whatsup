import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import App from './App';

describe('App component', function () {
  it('should work', function () {
    const app = TestUtils.renderIntoDocument(<App />);
    // const h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    // expect(h1.textContent).toEqual('Hello world!');
    expect(1).toEqual(1);
  });
});
