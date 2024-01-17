import SbInput from '../../../../components/SB-Input/sb-input';
import SbDateRangePicker from '../../../../components/sb-data-range-picker/sb-date-range-picker';
import { useState } from 'react';
import { faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';

const MAX_GUESTS_INPUT_VALUE = 10;

const HeroCover = () => {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('Pune');
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  const onDatePickerIconClick = () => {
    if (isDatePickerVisible) {
      setisDatePickerVisible(false);
    } else {
      setisDatePickerVisible(true);
    }
  };
  const onDateSelect = (selection) => {
    console.log(selection);
  };
  const onLocationChangeInput = (e) => {
    setLocationInputValue(e.target.value);
  };
  const onNumGuestsInputChange = (e) => {
    const userInputValue = e.target.value;
    if (userInputValue < MAX_GUESTS_INPUT_VALUE && userInputValue > 0) {
      setNumGuestsInputValue(e.target.value);
    }
  };
  return (
    <div className="bg-brand min-h-[400px] md:min-h-72 lg:min-h-60 text-slate-100 relative">
      <div className="hero-content__container flex flex-col items-center container mx-auto px-2 md:px-0">
        <></>
        <div className="hero-content__text py-4">
          <h3 className="text-4xl font-medium">
            Discover your perfect stay around the globe
          </h3>
          <p className="my-1">
            Enter your dates to see the latest prices and begin your journey of
            relaxation and adventure today.
          </p>
        </div>
        <div className="flex flex-wrap flex-col lg:flex-row hero-content__search-box">
          <SbInput
            size="sm"
            value={locationInputValue}
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
          <button className="w-full md:w-auto sb__button--secondary bg-brand-secondary px-4 py-2">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCover;
