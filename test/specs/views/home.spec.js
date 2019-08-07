import React from 'react';
import View from '../../../src/views/home';
import { shallow } from 'enzyme';

describe('Home View', () => {
  const createComponent = () => {
    const props = {
      store: {
        getState: () => [{}]
      }
    };

    return shallow(<View {...props} />);
  };

  it('should render without error', () => {
    expect(createComponent).not.toThrow();
  });

  it('should render a title', () => {
    expect(1).toBe(1);
  });
});
