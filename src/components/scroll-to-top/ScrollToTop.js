import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that scrolls to the top of the page when the route changes.
 * @component
 * @returns {null}
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
