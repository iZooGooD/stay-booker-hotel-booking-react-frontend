import { faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from 'components/ux/data-range-picker/DateRangePicker';
import Input from 'components/ux/input/Input';

/**
 * GlobalSearchBox Component
 * Renders a search box with input fields for location, number of guests, and a date range picker.
 * It includes a search button to trigger the search based on the entered criteria.
 *
 * @param {Object} props - Props for the component.
 * @param {string} props.locationInputValue - The current value of the location input.
 * @param {string} props.numGuestsInputValue - The current value of the number of guests input.
 * @param {boolean} props.isDatePickerVisible - Flag to control the visibility of the date picker.
 * @param {Function} props.onLocationChangeInput - Callback for location input changes.
 * @param {Function} props.onNumGuestsInputChange - Callback for number of guests input changes.
 * @param {Function} props.onDatePickerIconClick - Callback for the date picker icon click event.
 * @param {Array} props.locationTypeheadResults - Results for the location input typeahead.
 * @param {Function} props.onSearchButtonAction - Callback for the search button click event.
 * @param {Function} props.onDateChangeHandler - Callback for handling date range changes.
 * @param {Function} props.setisDatePickerVisible - Callback to set the visibility state of the date picker.
 * @param {Object} props.dateRange - The selected date range.
 */
const GlobalSearchBox = (props) => {
  const {
    locationInputValue,
    numGuestsInputValue,
    isDatePickerVisible,
    onLocationChangeInput,
    onNumGuestsInputChange,
    onDatePickerIconClick,
    locationTypeheadResults,
    onSearchButtonAction,
    onDateChangeHandler,
    setisDatePickerVisible,
    dateRange,
  } = props;
  return (
    <div className="flex flex-wrap flex-col lg:flex-row hero-content__search-box">
      <Input
        size="sm"
        value={locationInputValue}
        typeheadResults={locationTypeheadResults}
        icon={faLocationDot}
        onChangeInput={onLocationChangeInput}
      />
      <DateRangePicker
        isDatePickerVisible={isDatePickerVisible}
        onDatePickerIconClick={onDatePickerIconClick}
        onDateChangeHandler={onDateChangeHandler}
        setisDatePickerVisible={setisDatePickerVisible}
        dateRange={dateRange}
      />
      <Input
        size="sm"
        value={numGuestsInputValue}
        onChangeInput={onNumGuestsInputChange}
        placeholder="No. of guests"
        icon={faPerson}
        type="number"
      />
      <button
        className="w-full md:w-auto sb__button--secondary bg-brand-secondary hover:bg-yellow-600 px-4 py-2 text-white"
        onClick={onSearchButtonAction}
      >
        SEARCH
      </button>
    </div>
  );
};

export default GlobalSearchBox;
