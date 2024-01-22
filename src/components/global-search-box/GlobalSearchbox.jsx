import { faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';
import SbInput from '../SB-Input/sb-input';
import SbDateRangePicker from '../sb-data-range-picker/sb-date-range-picker';

const GlobalSearchBox = (props) => {
  const {
    locationInputValue,
    numGuestsInputValue,
    isDatePickerVisible,
    onLocationChangeInput,
    onNumGuestsInputChange,
    onDateSelect,
    onDatePickerIconClick,
    locationTypeheadResults,
  } = props;
  return (
    <div className="flex flex-wrap flex-col lg:flex-row hero-content__search-box">
      <SbInput
        size="sm"
        value={locationInputValue}
        typeheadResults={locationTypeheadResults}
        maxTypeheadResults={5}
        icon={faLocationDot}
        onChangeInput={onLocationChangeInput}
      />
      <SbDateRangePicker
        isDatePickerVisible={isDatePickerVisible}
        onDatePickerIconClick={onDatePickerIconClick}
        onDateSelect={onDateSelect}
      />
      <SbInput
        size="sm"
        value={numGuestsInputValue}
        onChangeInput={onNumGuestsInputChange}
        placeholder="No. of guests"
        icon={faPerson}
        type="number"
      />
      <button className="w-full md:w-auto sb__button--secondary bg-brand-secondary px-4 py-2 text-white">
        SEARCH
      </button>
    </div>
  );
};

export default GlobalSearchBox;
