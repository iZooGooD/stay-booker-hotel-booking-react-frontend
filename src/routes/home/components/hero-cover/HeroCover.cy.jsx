import React from 'react';
import HeroCover from './HeroCover';

describe('<HeroCover />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HeroCover />);
  });
});
