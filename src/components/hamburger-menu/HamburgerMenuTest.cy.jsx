/// <reference types="Cypress" />
import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import { BrowserRouter } from 'react-router-dom';

describe('<HamburgerMenu />', () => {
  it('renders', () => {
    cy.mount(
      <BrowserRouter>
        <HamburgerMenu
          isAuthenticated={false}
          isVisible={true}
          onHamburgerMenuToggle={() => {}}
        />
      </BrowserRouter>
    );
    cy.get('[data-testid=hamburger-menu__account-status]').should(
      'have.text',
      'Login/Register',
      'Initial account status is correct'
    );
  });
  it('Should show "My account" when isAuthenticated is true', () => {
    cy.mount(
      <BrowserRouter>
        <HamburgerMenu
          isAuthenticated={true}
          isVisible={true}
          onHamburgerMenuToggle={() => {}}
        />
      </BrowserRouter>
    );
    cy.get('[data-testid=hamburger-menu__account-status]').should(
      'have.text',
      'My account'
    );
  });
});
