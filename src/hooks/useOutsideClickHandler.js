import { useEffect } from 'react';

/**
 * A custom hook that triggers a callback function when a click event occurs outside of a specified element.
 *
 * @param {React.RefObject} ref - A React ref object attached to the element to monitor for outside clicks.
 * @param {Function} onOutsideClick - A callback function to execute when an outside click is detected.
 */
const useOutsideClickHandler = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClickHandler;
