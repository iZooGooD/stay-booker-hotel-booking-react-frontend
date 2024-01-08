import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('Home component renders', () => {
  test('renders without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
