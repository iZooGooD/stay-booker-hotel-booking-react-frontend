/// <reference types="Cypress" />
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('<Navbar />', () => {
  it('Hamburger menu visibility toggles on click', () => {
    cy.mount(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Simulate click to open hamburger menu
    cy.get('[data-testid=menu-toggle__button]').click();

    // Check if the HamburgerMenu is visible
    cy.get('[data-testid=hamburger-menu]').should(
      'have.class',
      'absolute right-0 w-1/2 top-0 h-screen'
    );

    // Simulate click to close hamburger menu
    cy.get('[data-testid=menu-close__button]').click();

    // Check if the HamburgerMenu is not visible
    cy.get('[data-testid=hamburger-menu]').should('have.class', 'hidden');
  });
});
