import { Link, useNavigate } from 'react-router-dom';
import DropdownButton from '../dropdown-button/DropdownButton';

const NavbarItems = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const dropdownOptions = [
    { name: 'Profile', onClick: () => navigate('/user-profile') },
    { name: 'Logout' },
  ];

  return (
    <>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/"
          className="uppercase font-medium text-slate-100 hover-underline-animation"
        >
          Home
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/hotels"
          className="uppercase font-medium text-slate-100 hover-underline-animation"
        >
          Hotels
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/about-us"
          className="uppercase font-medium text-slate-100 hover-underline-animation"
        >
          About us
        </Link>
      </li>
      <li className={`${!isAuthenticated && 'p-4'}`}>
        {isAuthenticated ? (
          <DropdownButton triggerType="click" options={dropdownOptions} />
        ) : (
          <Link
            to="/login"
            className="uppercase font-medium text-slate-100 hover-underline-animation"
          >
            Login/Register
          </Link>
        )}
      </li>
    </>
  );
};
export default NavbarItems;
