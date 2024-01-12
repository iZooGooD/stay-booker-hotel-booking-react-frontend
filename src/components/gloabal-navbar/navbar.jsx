import logo from '../../assests/logos/stay_booker_logo.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from '../../services/NetworkAdapter';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onHamburgerMenuToggle = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await networkAdapter.get('/authUser');
      if (response) {
        setIsAuthenticated(response.data.isAuthenticated);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="relative flex flex-wrap justify-between items-center px-12 global-navbar__container background-brand shadow-sm">
      <div className="flex">
        <img src={logo} alt="site logo" className="site-logo__img" />
      </div>
      <ul className="list-none hidden md:flex">
        <li className="p-4">
          <Link
            to="/"
            className="uppercase font-medium text-slate-100 hover-underline-animation"
          >
            Home
          </Link>
        </li>
        <li className="p-4">
          <Link
            to="listings"
            className="uppercase font-medium text-slate-100 hover-underline-animation"
          >
            Booking
          </Link>
        </li>
        <li className="p-4">
          <Link
            to="/"
            className="uppercase font-medium text-slate-100 hover-underline-animation"
          >
            About us
          </Link>
        </li>
        <li className="p-4">
          {isAuthenticated ? (
            <Link
              to="/"
              className="uppercase font-medium text-slate-100 hover-underline-animation"
            >
              My account
            </Link>
          ) : (
            <Link
              to="/"
              className="uppercase font-medium text-slate-100 hover-underline-animation"
            >
              Login/Register
            </Link>
          )}
        </li>
      </ul>
      <FontAwesomeIcon
        data-testid="menu-toggle__button"
        icon={faBars}
        size="2x"
        color="#fff"
        className="block md:hidden"
        onClick={onHamburgerMenuToggle}
      />
      <HamburgerMenu
        isVisible={isVisible}
        onHamburgerMenuToggle={onHamburgerMenuToggle}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default Navbar;
