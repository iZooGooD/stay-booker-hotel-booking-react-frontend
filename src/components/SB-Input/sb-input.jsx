import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SbInput = (props) => {
  const sizeToClassMapping = {
    sm: 'w-[332px]',
  };
  const { classes, size, value, onChangeInput, icon } = props;
  return (
    <div
      className={`relative stay-booker-input__container ${sizeToClassMapping[size]}`}
    >
      <input
        className={`stay-booker__input px-8 py-2 ${classes ? classes : ''} ${
          sizeToClassMapping[size]
        }`}
        type="text"
        value={value}
        onChange={onChangeInput}
      ></input>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="absolute transform-center-y left-4"
          color="#074498"
        />
      )}
    </div>
  );
};

export default SbInput;
