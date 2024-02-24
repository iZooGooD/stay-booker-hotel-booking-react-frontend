import GlobalFooter from 'components/global-footer/GlobalFooter';
import GlobalNavbar from 'components/global-navbar/GlobalNavbar';
import { Outlet } from 'react-router-dom';

/**
 * Base layout
 */
const BaseLayout = () => {
  return (
    <>
      <GlobalNavbar />
      <Outlet />
      <GlobalFooter />
    </>
  );
};

export default BaseLayout;
