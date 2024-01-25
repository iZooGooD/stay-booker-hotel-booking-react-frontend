import React, { useState, useEffect } from 'react';
import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';
import GlobalSearchBox from '../../components/global-search-box/GlobalSearchbox';
import ResultsContainer from '../../components/results-container/ResultsContainer';
import { networkAdapter } from '../../services/NetworkAdapter';
import isEmpty from '../../utils/helpers';
import { MAX_GUESTS_INPUT_VALUE } from '../../utils/constants';
import { formatDate } from '../../utils/date-helpers';

/**
 * Component for searching hotels.
 * It provides options to select location, number of guests, date, and filters.
 */
const HotelsSearch = () => {
  // State for managing date picker visibility
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  // State for managing location input value
  const [locationInputValue, setLocationInputValue] = useState('pune');

  // State for managing number of guests input value
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');

  // State for storing available cities
  const [availableCities, setAvailableCities] = useState([]);

  const [dateSelection, setDateSelection] = useState({});

  // State for managing filters data
  const [filtersData, setFiltersData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // State for storing hotels search results
  const [hotelsResults, setHotelsResults] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // State for managing selected filters
  const [selectedFiltersState, setSelectedFiltersState] = useState({});

  /**
   * Handles updates to filters.
   * @param {Object} updatedFilter - The filter object that is updated.
   */
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

  const onSearchButtonAction = () => {
    const activeFilters = getActiveFilters();
    const numGuest = Number(numGuestsInputValue);
    const checkInDate = formatDate(dateSelection.startDate) ?? '';
    const checkOutDate = formatDate(dateSelection.endDate) ?? '';
    fetchHotels({
      city: locationInputValue,
      ...activeFilters,
      guests: numGuest,
      checkInDate,
      checkOutDate,
    });
  };

  const getActiveFilters = () => {
    const filters = {};
    selectedFiltersState.forEach((category) => {
      const selectedValues = category.filters
        .filter((filter) => filter.isSelected)
        .map((filter) => filter.value);

      if (selectedValues.length > 0) {
        filters[category.filterId] = selectedValues;
      }
    });
    if (!isEmpty(filters)) {
      return filters;
    }
    return null;
  };

  // Toggles the visibility of the date picker
  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  // Logs the selected date (can be replaced with a handler function)
  const onDateSelect = (selection) => {
    setDateSelection(selection);
  };

  /**
   * Handles changes in the location input.
   * Refreshes hotel data if the location is valid.
   * @param {string} value - The new location value.
   */
  const onLocationChangeInput = (value) => {
    setLocationInputValue(value.toLowerCase());
  };

  /**
   * Handles changes in the number of guests input.
   * @param {String} numGuests - Number of guests.
   */
  const onNumGuestsInputChange = (numGuests) => {
    if (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) {
      setNumGuestsInputValue(numGuests);
    }
  };

  const fetchHotels = async (filters) => {
    setHotelsResults({
      isLoading: true,
      data: [],
      errors: [],
    });
    const hotelsResultsResponse = await networkAdapter.get('/api/hotels', {
      filters: JSON.stringify(filters),
    });
    if (hotelsResultsResponse) {
      setHotelsResults({
        isLoading: false,
        data: hotelsResultsResponse.data.elements,
        errors: hotelsResultsResponse.errors,
      });
    }
  };

  const getInitialData = async () => {
    const hotelsResultsResponse = await networkAdapter.get('/api/nearbyHotels');

    const filtersDataResponse = await networkAdapter.get(
      'api/hotels/verticalFilters'
    );

    if (hotelsResultsResponse) {
      setHotelsResults({
        isLoading: false,
        data: hotelsResultsResponse.data.elements,
        errors: hotelsResultsResponse.errors,
      });
    }
    if (filtersDataResponse) {
      setFiltersData({
        isLoading: false,
        data: filtersDataResponse.data.elements,
        errors: filtersDataResponse.errors,
      });
    }
  };

  // Fetches the list of available cities
  const fetchAvailableCities = async () => {
    const availableCitiesResponse = await networkAdapter.get(
      '/api/availableCities'
    );
    if (availableCitiesResponse) {
      setAvailableCities(availableCitiesResponse.data.elements);
    }
  };

  // Fetch available cities and initial data on component mount
  useEffect(() => {
    fetchAvailableCities();
    getInitialData();
  }, []);

  // Update selected filters state when filters data changes
  useEffect(() => {
    setSelectedFiltersState(
      filtersData.data.map((filterGroup) => ({
        ...filterGroup,
        filters: filterGroup.filters.map((filter) => ({
          ...filter,
          isSelected: false,
        })),
      }))
    );
  }, [filtersData]);

  useEffect(() => {
    if (selectedFiltersState.length > 0) {
      const activeFilters = getActiveFilters();
      if (activeFilters) {
        activeFilters.city = locationInputValue.toLowerCase();
        fetchHotels(activeFilters);
      }
    }
  }, [selectedFiltersState]);

  return (
    <div className="hotels">
      <GlobalNavbar />
      <div className="bg-brand px-2 lg:h-[120px] h-[220px] flex items-center justify-center">
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          locationTypeheadResults={availableCities}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          onLocationChangeInput={onLocationChangeInput}
          onNumGuestsInputChange={onNumGuestsInputChange}
          onDateSelect={onDateSelect}
          onDatePickerIconClick={onDatePickerIconClick}
          onSearchButtonAction={onSearchButtonAction}
        />
      </div>
      <div className="my-4"></div>
      <ResultsContainer
        hotelsResults={hotelsResults}
        enableFilters={true}
        filtersData={filtersData}
        onFiltersUpdate={onFiltersUpdate}
        selectedFiltersState={selectedFiltersState}
      />
    </div>
  );
};

export default HotelsSearch;
