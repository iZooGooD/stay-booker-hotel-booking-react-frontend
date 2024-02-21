import HotelViewCard from 'components/hotel-view-card/HotelViewCard';
import VerticalFilters from 'components/vertical-filters/VerticalFilters';
import HotelViewCardSkeleton from 'components/hotel-view-card-skeleton/HotelViewCardSkeleton';
import VerticalFiltersSkeleton from 'components/vertical-filters-skeleton/VerticalFiltersSkeleton';
import EmptyHotelsState from 'components/empty-hotels-state/EmptyHotelsState';
import { useRef, useState } from 'react';
import useOutsideClickHandler from 'hooks/useOutsideClickHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { MAX_RESULTS_PER_PAGE } from 'utils/constants';

/**
 * ResultsContainer Component
 * Renders a container that displays hotel results, including hotel cards and filters.
 * It supports toggling of vertical filters and displays skeletons or empty states based on loading or data availability.
 *
 * @param {Object} props - Props for the component.
 * @param {Object} props.hotelsResults - Object containing hotel results data and loading state.
 * @param {boolean} props.enableFilters - Flag to enable or disable the filter feature.
 * @param {Array} props.filtersData - Array of filter data objects for the vertical filters.
 * @param {Array} props.selectedFiltersState - Array of selected filter states.
 * @param {Function} props.onFiltersUpdate - Callback function to handle filter updates.
 * @param {Function} props.onClearFiltersAction - Callback function to handle the action of clearing filters.
 */
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
  const buttonRef = useRef();

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsVerticalFiltersOpen(false);
    }
  });

  const toggleVerticalFiltersAction = () => {
    // Toggle based on the current state
    setIsVerticalFiltersOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {enableFilters && (
        <div className="vertical-filters__toggle-menu block mx-4 my-2 md:hidden">
          <button
            ref={buttonRef}
            data-testid="vertical-filters__toggle-menu"
            onClick={toggleVerticalFiltersAction}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon icon={faFilter} size="sm" className="mr-1" />{' '}
            Filters
          </button>
        </div>
      )}
      <div className="flex gap-x-0 md:gap-x-4 items-start mx-2">
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
          ) : hotelsResults.data.length > 0 ? (
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
