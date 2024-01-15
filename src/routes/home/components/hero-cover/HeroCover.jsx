import SbInput from '../../../../components/SB-Input/sb-input';
import SbDateRangePicker from '../../../../components/sb-data-range-picker/sb-date-range-picker';
import { useState } from 'react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const HeroCover = () => {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('Pune');
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
  return (
    <div className="bg-brand min-h-60 text-slate-100 relative">
      <div className="hero-content__container container mx-auto px-2 md:px-0">
        <></>
        <div className="hero-content__text py-4">
          <h3 className="text-4xl font-medium">Search hotels in Pune</h3>
          <p className="my-1">
            Enter your dates to see the latest prices and deals for Pune hotels
          </p>
        </div>
        <div className="flex flex-wrap hero-content__search-box">
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
        </div>
      </div>
    </div>
  );
};

export default HeroCover;
