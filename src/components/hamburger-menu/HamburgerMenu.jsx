import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HamburgerMenu = (props) => {
  const { isVisible, onHamburgerMenuToggle, isAuthenticated } = props;
  return (
    <div
      className={`background-brand ${
        isVisible ? 'absolute right-0 w-1/2 top-0 h-screen' : 'hidden'
      }`}
    >
      <div className="absolute right-5 top-2">
        <FontAwesomeIcon
          icon={faXmark}
          size="2x"
          color="#fff"
          onClick={onHamburgerMenuToggle}
        />
      </div>
      <ul className="list-none">
        <li className="p-4">
          <Link to="/" className="uppercase font-medium text-slate-100">
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

export default HamburgerMenu;
