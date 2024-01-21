import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SbInput = (props) => {
  const { classes, value, onChangeInput, icon, type, placeholder } = props;
  return (
    <div className={`relative stay-booker-input__container w-full md:w-auto`}>
      <input
        className={`stay-booker__input w-full px-8 py-2 ${
          classes ? classes : ''
        }`}
        type={type || 'text'}
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
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
