import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NavbarItems from 'components/navbar-items/NavbarItems';

/**
 * HamburgerMenu Component
 * Renders a hamburger menu with navigation links. It can be toggled visible or hidden.
 * The menu contains links to Home, Hotels, About Us, and depending on the authentication status,
 * a link to either the user profile or the login/register page.
 *
 * @param {Object} props - Props for the component.
 * @param {boolean} props.isVisible - Controls the visibility of the hamburger menu.
 * @param {Function} props.onHamburgerMenuToggle - Callback function to toggle the visibility of the menu.
 * @param {boolean} props.isAuthenticated - Indicates whether the user is authenticated.
 */
const HamburgerMenu = (props) => {
  const { isVisible, onHamburgerMenuToggle, isAuthenticated } = props;

  return (
    <div
      data-testid="hamburger-menu"
      className={`bg-brand shadow-2xl z-20 ${
        isVisible ? 'fixed right-0 w-1/2 top-0 h-screen' : 'hidden'
      }`}
    >
      <div className="absolute right-5 top-2">
        <FontAwesomeIcon
          data-testid="menu-close__button"
          icon={faXmark}
          size="2x"
          color="#fff"
          onClick={onHamburgerMenuToggle}
        />
      </div>
      <ul className="list-none mt-12">
        <NavbarItems
          onHamburgerMenuToggle={onHamburgerMenuToggle}
          isAuthenticated={isAuthenticated}
        />
      </ul>
    </div>
  );
};

export default HamburgerMenu;
