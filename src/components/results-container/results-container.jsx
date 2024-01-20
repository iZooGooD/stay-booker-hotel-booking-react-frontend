import HotelViewCard from '../hotel-view-card/HotelViewCard';
import SbCheckbox from '../sb-checkbox/sb-checkbox';
const ResultsContainer = (props) => {
  const { hotelsResults, enableFilters } = props;
  const onChange = (state) => {
    console.log('state', state);
  };
  return (
    <div className="flex gap-x-4 items-start">
      {enableFilters && (
        <div className="hotels-filters__container border w-[240px]">
          <div className="hotels-filters__header flex justify-between items-center py-2 border-b-2  px-4">
            <h4 className="text-base font-bold text-slate-600 uppercase">
              Filters
            </h4>
            <span className="text-sm ml-4">Clear</span>
          </div>
          <div className="hotels-filters__start-ratings border-b-2">
            <h4 className="text-base font-bold text-slate-600 my-1 px-2">
              Star ratings
            </h4>
            <SbCheckbox
              id="5_start_filter"
              label="5 Star"
              onChange={onChange}
            />
            <SbCheckbox
              id="4_start_filter"
              label="4 Star"
              onChange={onChange}
            />
            <SbCheckbox
              id="3_start_filter"
              label="3 Star"
              onChange={onChange}
            />
          </div>
          <div className="hotels-filters__property-type border-b-2">
            <h4 className="text-base font-bold text-slate-600 my-1 px-2">
              Property type
            </h4>
            <div className="flex items-center pl-2 py-1">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-slate-600 "
              >
                Hotel
              </label>
            </div>
            <div className="flex items-center pl-2 py-2">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-slate-600 "
              >
                Apartment
              </label>
            </div>
            <div className="flex items-center pl-2 py-2">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-slate-600 "
              >
                Villa
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full">
        {hotelsResults.map((hotel) => (
          <HotelViewCard
            key={hotel.hotelCode}
            title={hotel.title}
            image={hotel.image}
            subtitle={hotel.subtitle}
            benefits={hotel.benefits}
            ratings={hotel.ratings}
            price={hotel.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsContainer;
