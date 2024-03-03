import { useState, useRef } from 'react';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';

const DropdownButton = (props) => {
  const triggerType = props.triggerType || 'click';
  const color = props.color || 'bg-brand';
  const wrapperRef = useRef();
  const buttonRef = useRef();
  const [isDropdownContainerVisible, setIsDropdownContainerVisible] =
    useState(false);

  const onDropdownClickTrigger = () => {
    triggerType === 'click' &&
      setIsDropdownContainerVisible(!isDropdownContainerVisible);
  };

  const onDropdownItemClick = (onClikCallback) => {
    setIsDropdownContainerVisible(false);
    onClikCallback();
  };

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsDropdownContainerVisible(false);
    }
  });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        id="dropdownDefaultButton"
        onClick={onDropdownClickTrigger}
        className={`dropdown-trigger__button text-white ${color} font-medium p-4 uppercase text-center inline-flex items-center`}
        type="button"
      >
        MY ACCOUNT{' '}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        ref={wrapperRef}
        className={`dropdown-trigger__container z-10 ${
          isDropdownContainerVisible ? 'visible' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          {props.options &&
            props.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    onDropdownItemClick(option.onClick);
                  }}
                  className="w-full block text-left px-4 py-2 hover:bg-brand  dark:hover:text-white"
                >
                  {option.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownButton;
