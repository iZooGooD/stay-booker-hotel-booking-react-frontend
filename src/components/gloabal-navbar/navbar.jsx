import './navbar.scss';
import logo from '../../assests/logos/stay_booker_logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between px-12 global-navbar__container background-brand">
      <div className="flex">
        <img src={logo} alt="site logo" className="site-logo__img" />
      </div>
      <ul className="list-none flex">
        <li className="p-4">
          <Link to="/" className="uppercase font-medium text-white">
            Home
          </Link>
        </li>
        <li className="p-4">
          <Link to="listings" className="uppercase font-medium text-white">
            Booking
          </Link>
        </li>
        <li className="p-4">
          <Link to="/" className="uppercase font-medium text-white">
            About us
          </Link>
        </li>
        <li className="p-4">
          <Link to="/" className="uppercase font-medium text-white">
            My account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
