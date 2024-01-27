import GlobalSearchBox from '../../../../components/global-search-box/GlobalSearchbox';

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
