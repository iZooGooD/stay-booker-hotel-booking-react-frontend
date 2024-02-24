import React from 'react';
import Toast from './Toast';

describe('Toast Component', () => {
  it('renders error toast correctly', () => {
    const dismissError = cy.spy().as('dismissError');
    const type = 'error';
    const message = 'An error occurred';

    cy.mount(
      <Toast type={type} message={message} dismissError={dismissError} />
    );

    cy.get('[data-testid="toast__outlet"]').should('exist');
    cy.get('[data-testid="toast__outlet"]').should(
      'have.class',
      'bg-red-100 border-l-4 border-red-500 text-red-700'
    );
    cy.get('[data-testid="toast__message"]').should('have.text', message);
    cy.get('[data-testid="toast__dismiss"]').should('exist');
    cy.get('[data-testid="toast__dismiss"]').click();
    cy.get('@dismissError').should('have.been.calledOnce');
  });

  it('renders success toast correctly', () => {
    const dismissError = cy.spy().as('dismissError');
    const type = 'success';
    const message = 'Action completed successfully';

    cy.mount(
      <Toast type={type} message={message} dismissError={dismissError} />
    );

    cy.get('[data-testid="toast__outlet"]').should('exist');
    cy.get('[data-testid="toast__outlet"]').should(
      'have.class',
      'bg-green-100 border-l-4 border-green-500 text-green-700 my-2'
    );
    cy.get('[data-testid="toast__message"]').should('have.text', message);
    cy.get('[data-testid="toast__dismiss"]').should('exist');
    cy.get('[data-testid="toast__dismiss"]').click();
    cy.get('@dismissError').should('have.been.calledOnce');
  });
});
