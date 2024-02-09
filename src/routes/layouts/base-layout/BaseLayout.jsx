import GlobalFooter from 'components/global-footer/GlobalFooter';
import GlobalNavbar from 'components/global-navbar/GlobalNavbar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

/**
 * Base layout
 */
const BaseLayout = () => {
  const location = useLocation();
  // Hide footer on hotels route so that we can integrate finite scroll
  const shouldHideGlobalFooter = location.pathname === '/hotels';
  return (
    <>
      <GlobalNavbar />
      <Outlet />
      {!shouldHideGlobalFooter && <GlobalFooter />}
    </>
  );
};

export default BaseLayout;
