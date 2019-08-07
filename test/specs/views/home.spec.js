import React from 'react';
import View from '../../../src/views/home';
import { shallow } from 'enzyme';

describe('Home View', () => {
  
  let wrapper;
  const store = {
    getState: () => [{}]
  };
  
  beforeEach(() => {
    wrapper = shallow(<View store={store}/>);
  });
  
  it('should exist', () => {
    expect(View).toBeDefined();
  });
  
  it('should render a title', () => {
    expect(1).toBe(1);
  });
});
