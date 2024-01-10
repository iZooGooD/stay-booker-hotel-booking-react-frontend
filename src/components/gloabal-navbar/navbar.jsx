import './navbar.scss';
import logo from '../../assests/logos/stay_booker_logo.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from '../../services/NetworkAdapter';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <div className="flex justify-between px-12 global-navbar__container background-brand shadow-sm">
      <div className="flex">
        <img src={logo} alt="site logo" className="site-logo__img" />
      </div>
      <ul className="list-none flex">
        <li className="p-4">
          <Link
            to="/"
            className="uppercase font-medium text-slate-100 hover:underline"
          >
            Home
          </Link>
        </li>
        <li className="p-4">
          <Link to="listings" className="uppercase font-medium text-slate-100">
            Booking
          </Link>
        </li>
        <li className="p-4">
          <Link to="/" className="uppercase font-medium text-slate-100">
            About us
          </Link>
        </li>
        <li className="p-4">
          {isAuthenticated ? (
            <Link to="/" className="uppercase font-medium text-slate-100">
              My account
            </Link>
          ) : (
            <Link to="/" className="uppercase font-medium text-slate-100">
              Login/Register
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
