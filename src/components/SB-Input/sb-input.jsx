const SbInput = (props) => {
  const sizeToClassMapping = {
    sm: 'px-4 py-2',
  };
  const defaults = {
    isRounded: true,
    size: '2x',
  };
  const { classes, isRounded, size, placeholder } = props;
  return (
    <input
      className={`stay-booker__input ${classes ? classes : ''} ${
        sizeToClassMapping[size]
      }`}
      type="text"
      placeholder={placeholder}
    ></input>
  );
};

export default SbInput;
