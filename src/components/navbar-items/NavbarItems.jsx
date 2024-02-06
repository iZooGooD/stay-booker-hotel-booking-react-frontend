import { Link, useNavigate, useLocation } from 'react-router-dom';
import DropdownButton from 'components/dropdown-button/DropdownButton';

const NavbarItems = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownOptions = [
    { name: 'Profile', onClick: () => navigate('/user-profile') },
    { name: 'Logout' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/"
          className={`uppercase font-medium text-slate-100 hover-underline-animation`}
        >
          Home
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/hotels"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${
            isActive('/hotels') && 'active-link'
          }`}
        >
          Hotels
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/about-us"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${
            isActive('/about-us') && 'active-link'
          }`}
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
            className={`uppercase font-medium text-slate-100 hover-underline-animation ${
              isActive('/login') && 'active-link'
            }`}
          >
            Login/Register
          </Link>
        )}
      </li>
    </>
  );
};

export default NavbarItems;
