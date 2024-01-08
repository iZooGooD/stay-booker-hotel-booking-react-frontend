import './navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <h3 className="p-4 font-medium text-lg">StayBooker PRO</h3>
      </div>
      <ul className="list-none flex">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="listings">Booking</Link>
        </li>
        <li className="p-4">
          <Link to="/">About us</Link>
        </li>
        <li className="p-4">
          <Link to="/">My account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
