import HotelViewCard from '../hotel-view-card/HotelViewCard';
import VerticalFilters from '../vertical-filters/VerticalFilters';
import HotelViewCardSkeleton from '../hotel-view-card-skeleton/HotelViewCardSkeleton';
import VerticalFiltersSkeleton from '../vertical-filters-skeleton/vertical-filters-skeleton';
import EmptyHotelsState from '../empty-hotels-state/EmptyHotelsState';

const ResultsContainer = (props) => {
  const {
    hotelsResults,
    enableFilters,
    filtersData,
    selectedFiltersState,
    onFiltersUpdate,
    onClearFiltersAction,
  } = props;

  return (
    <div className="flex gap-x-4 items-start">
      {enableFilters && selectedFiltersState.length > 0 && (
        <VerticalFilters
          filtersData={selectedFiltersState}
          onFiltersUpdate={onFiltersUpdate}
          onClearFiltersAction={onClearFiltersAction}
        />
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
  );
};

export default ResultsContainer;
