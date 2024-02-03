const Checkbox = (props) => {
  const { id, filterId, label, subtitle, onFiltersUpdate, isSelected } = props;
  const onChange = () => {
    onFiltersUpdate({ filterId, id });
  };

  return (
    <div className="flex items-center pl-2 py-1" onClick={onChange}>
      <input
        data-testid={id}
        id={id}
        type="checkbox"
        checked={isSelected}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor="default-checkbox" className="ms-2 text-slate-600 ">
        {label}
      </label>
      {subtitle && (
        <span className="text-sm text-gray-400 ml-auto mr-2 ">{subtitle}</span>
      )}
    </div>
  );
};

export default Checkbox;
