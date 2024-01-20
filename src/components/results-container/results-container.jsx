import { useState, useEffect } from 'react';
import HotelViewCard from '../hotel-view-card/HotelViewCard';
import VerticalFilters from '../vertical-filters/vertical-filters';
const ResultsContainer = (props) => {
  const { hotelsResults, enableFilters, filtersData } = props;
  const [selectedFiltersState, setSelectedFiltersState] = useState({});

  const onFiltersUpdate = (updatedFilter) => {
    setSelectedFiltersState(
      selectedFiltersState.map((filterGroup) => {
        if (filterGroup.filterId === updatedFilter.filterId) {
          return {
            ...filterGroup,
            filters: filterGroup.filters.map((filter) => {
              if (filter.id === updatedFilter.id) {
                return {
                  ...filter,
                  isSelected: !filter.isSelected,
                };
              }
              return filter;
            }),
          };
        }
        return filterGroup;
      })
    );
  };

  useEffect(() => {
    setSelectedFiltersState(
      filtersData.map((filterGroup) => ({
        ...filterGroup,
        filters: filterGroup.filters.map((filter) => ({
          ...filter,
          isSelected: false,
        })),
      }))
    );
  }, [filtersData]);

  return (
    <div className="flex gap-x-4 items-start">
      {enableFilters && selectedFiltersState.length > 0 && (
        <VerticalFilters
          filtersData={selectedFiltersState}
          onFiltersUpdate={onFiltersUpdate}
        />
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
