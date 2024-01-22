import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const SbInput = (props) => {
  const {
    classes,
    value,
    onChangeInput,
    icon,
    type,
    placeholder,
    typeheadResults,
    maxTypeheadResults,
  } = props;
  const [isTypeheadVisible, setIsTypeheadVisible] = useState(false);
  const filteredResults = (value) => {
    return typeheadResults
      .filter((result) => result.includes(value.toLowerCase()))
      .slice(0, maxTypeheadResults);
  };

  const onTypeheadResultClick = (value) => {
    onChangeInput(value);
  };

  const onBlur = () => {
    // Delay hiding the typehead results to allow time for click event on result
    setTimeout(() => {
      setIsTypeheadVisible(false);
    }, 200);
  };

  return (
    <div className={`relative stay-booker-input__container w-full md:w-auto`}>
      <input
        className={`stay-booker__input w-full px-8 py-2 capitalize ${
          classes ? classes : ''
        }`}
        type={type || 'text'}
        value={value}
        onChange={(e) => onChangeInput(e.target.value)}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={() => setIsTypeheadVisible(true)}
      ></input>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="absolute transform-center-y left-4"
          color="#074498"
        />
      )}
      <div
        className={`z-10 absolute bg-white  w-full ${
          isTypeheadVisible ? 'visible' : 'hidden'
        }`}
      >
        <ul>
          {typeheadResults &&
            value.length > 0 &&
            filteredResults(value).map((result, index) => (
              <li
                key={index}
                className="text-base  text-slate-600 p-2 capitalize cursor-pointer border-b-2 hover:bg-slate-100"
                onClick={() => onTypeheadResultClick(result)}
              >
                {result}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SbInput;
