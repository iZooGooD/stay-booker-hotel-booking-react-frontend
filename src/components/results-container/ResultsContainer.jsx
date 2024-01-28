import HotelViewCard from '../hotel-view-card/HotelViewCard';
import VerticalFilters from '../vertical-filters/VerticalFilters';
import HotelViewCardSkeleton from '../hotel-view-card-skeleton/HotelViewCardSkeleton';
import VerticalFiltersSkeleton from '../vertical-filters-skeleton/vertical-filters-skeleton';
import EmptyHotelsState from '../empty-hotels-state/EmptyHotelsState';
import { useRef, useState } from 'react';
import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const ResultsContainer = (props) => {
  const {
    hotelsResults,
    enableFilters,
    filtersData,
    selectedFiltersState,
    onFiltersUpdate,
    onClearFiltersAction,
  } = props;

  const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);

  const wrapperRef = useRef();
  useOutsideClickHandler(wrapperRef, () => setIsVerticalFiltersOpen(false));

  const toggleVerticalFiltersAction = () => {
    setIsVerticalFiltersOpen(!isVerticalFiltersOpen);
  };

  return (
    <div className="relative">
      {enableFilters && (
        <div className="vertical-filters__toggle-menu block mx-2 my-2 md:hidden">
          <button
            data-testid="vertical-filters__toggle-menu"
            onClick={toggleVerticalFiltersAction}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon icon={faFilter} size="sm" className="mr-1" />{' '}
            Filters
          </button>
        </div>
      )}
      <div className="flex gap-x-0 md:gap-x-4 items-start">
        {enableFilters && selectedFiltersState.length > 0 && (
          <div ref={wrapperRef}>
            <VerticalFilters
              filtersData={selectedFiltersState}
              onFiltersUpdate={onFiltersUpdate}
              onClearFiltersAction={onClearFiltersAction}
              isVerticalFiltersOpen={isVerticalFiltersOpen}
            />
          </div>
        )}
        {enableFilters && filtersData.isLoading && <VerticalFiltersSkeleton />}
        <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full">
          {hotelsResults.isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <HotelViewCardSkeleton key={index} />
            ))
          ) : hotelsResults.data.length > 0 ? ( // Check if the data array has items
            hotelsResults.data.map((hotel) => (
              <HotelViewCard
                key={hotel.hotelCode}
                id={hotel.hotelCode}
                title={hotel.title}
                image={hotel.image}
                subtitle={hotel.subtitle}
                benefits={hotel.benefits}
                ratings={hotel.ratings}
                price={hotel.price}
              />
            ))
          ) : (
            <EmptyHotelsState />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsContainer;
