import GlobalSearchBox from 'components/global-search-box/GlobalSearchbox';

/**
 * HeroCover Component
 * Renders the hero cover section of the home page.
 * @param {Object} props - The component props.
 * @param {String} props.locationInputValue - The location input value.
 * @param {String} props.numGuestsInputValue - The number of guests input value.
 * @param {Boolean} props.isDatePickerVisible - The date picker visibility state.
 * @param {Function} props.onLocationChangeInput - The location input change handler.
 * @param {Function} props.onNumGuestsInputChange - The number of guests input change handler.
 * @param {Object} props.dateRange - The date range object.
 * @param {Function} props.onDateChangeHandler - The date change handler.
 * @param {Function} props.onDatePickerIconClick - The date picker icon click handler.
 * @param {Function} props.onSearchButtonAction - The search button click handler.
 * @param {Array} props.locationTypeheadResults - The location typehead results.
 * @param {Function} props.setisDatePickerVisible - The date picker visibility state setter.
 * @returns {JSX.Element} - The HeroCover component.
 */
const HeroCover = (props) => {
  const {
    locationInputValue,
    numGuestsInputValue,
    isDatePickerVisible,
    onLocationChangeInput,
    onNumGuestsInputChange,
    dateRange,
    onDateChangeHandler,
    onDatePickerIconClick,
    onSearchButtonAction,
    locationTypeheadResults,
    setisDatePickerVisible,
  } = props;
  return (
    <div className="bg-brand min-h-[400px] md:min-h-72 lg:min-h-60 text-slate-100">
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
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          locationTypeheadResults={locationTypeheadResults}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          setisDatePickerVisible={setisDatePickerVisible}
          onLocationChangeInput={onLocationChangeInput}
          onNumGuestsInputChange={onNumGuestsInputChange}
          dateRange={dateRange}
          onDateChangeHandler={onDateChangeHandler}
          onDatePickerIconClick={onDatePickerIconClick}
          onSearchButtonAction={onSearchButtonAction}
        />
      </div>
    </div>
  );
};

export default HeroCover;
