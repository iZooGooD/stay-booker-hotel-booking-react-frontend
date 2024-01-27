import logo from '../../assests/logos/stay_booker_logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const GlobalNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const onHamburgerMenuToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative flex flex-wrap justify-between items-center px-4 md:px-12 global-navbar__container bg-brand brand-divider-bottom">
      <div className="flex">
        <Link to="/">
          <img src={logo} alt="site logo" className="site-logo__img" />
        </Link>
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
            to="/hotels"
            className="uppercase font-medium text-slate-100 hover-underline-animation"
          >
            Hotels
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
              to="/user-profile"
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

export default GlobalNavbar;
