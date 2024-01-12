import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  test('Hamburger menu visibility toggles on click', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Simulate click to open hamburger menu
    const hamburgerIcon = screen.getByTestId('menu-toggle__button');
    fireEvent.click(hamburgerIcon);

    // Check if the HamburgerMenu is visible
    let hamburgerMenu = screen.getByTestId('hamburger-menu');
    expect(hamburgerMenu).toHaveClass('absolute right-0 w-1/2 top-0 h-screen');

    // Simulate click to close hamburger menu
    const closeIcon = screen.getAllByTestId('menu-close__button');
    fireEvent.click(closeIcon[0]);

    // Check if the HamburgerMenu is not visible
    hamburgerMenu = screen.getByTestId('hamburger-menu');
    expect(hamburgerMenu).toHaveClass('hidden');
  });
});
