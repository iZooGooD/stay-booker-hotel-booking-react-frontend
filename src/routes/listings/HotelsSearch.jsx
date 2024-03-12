import React, { useState, useEffect, useCallback } from 'react';
import GlobalSearchBox from 'components/global-search-box/GlobalSearchbox';
import ResultsContainer from 'components/results-container/ResultsContainer';
import { networkAdapter } from 'services/NetworkAdapter';
import isEmpty from 'utils/helpers';
import { MAX_GUESTS_INPUT_VALUE } from 'utils/constants';
import { formatDate } from 'utils/date-helpers';
import { useLocation, useSearchParams } from 'react-router-dom';
import { parse } from 'date-fns';
import PaginationController from 'components/ux/pagination-controller/PaginationController';
import { SORTING_FILTER_LABELS } from 'utils/constants';
import _debounce from 'lodash/debounce';

/**
 * Represents the hotels search component.
 * @component
 * @returns {JSX.Element} The hotels search component.
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

  // State for managing current results page
  const [currentResultsPage, setCurrentResultsPage] = useState(1);

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

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  // State for managing sorting filter value
  const [sortByFilterValue, setSortByFilterValue] = useState({
    value: 'default',
    label: 'Sort by',
  });

  // State for managing selected filters
  const [selectedFiltersState, setSelectedFiltersState] = useState({});

  const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(_debounce(queryResults, 1000), []);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  // Options for sorting filter
  const sortingFilterOptions = [
    { value: 'default', label: 'Sort by' },
    { value: 'priceLowToHigh', label: SORTING_FILTER_LABELS.PRICE_LOW_TO_HIGH },
    { value: 'priceHighToLow', label: SORTING_FILTER_LABELS.PRICE_HIGH_TO_LOW },
  ];

  /**
   * Handles updates to sorting filter.
   * @param {Object} selectedOption - The selected option.
   */
  const onSortingFilterChange = (selectedOption) => {
    setSortByFilterValue(selectedOption);
  };

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

  const onDateChangeHandler = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const onSearchButtonAction = () => {
    const activeFilters = getActiveFilters();
    const numGuest = Number(numGuestsInputValue);
    const checkInDate = formatDate(dateRange.startDate) ?? '';
    const checkOutDate = formatDate(dateRange.endDate) ?? '';
    setSearchParams({
      city: locationInputValue,
      numGuests: numGuestsInputValue,
    });
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

  /**
   * Handles changes in the location input.
   * Refreshes hotel data if the location is valid.
   * @param {string} value - The new location value.
   */
  const onLocationChangeInput = async (newValue) => {
    setLocationInputValue(newValue);
    // Debounce the queryResults function to avoid making too many requests
    debounceFn(newValue, availableCities);
  };

  /**
   * Queries the available cities based on the user's input.
   * @param {string} query - The user's input.
   * @returns {void}
   *
   */
  function queryResults(query, availableCities) {
    const filteredResults = availableCities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFilteredTypeheadResults(filteredResults);
  }

  /**
   * Handles changes in the number of guests input.
   * @param {String} numGuests - Number of guests.
   */
  const onNumGuestsInputChange = (numGuests) => {
    if (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) {
      setNumGuestsInputValue(numGuests);
    }
  };

  const onClearFiltersAction = () => {
    const hasActiveFilters = selectedFiltersState.some((filterGroup) =>
      filterGroup.filters.some((filter) => filter.isSelected)
    );

    if (hasActiveFilters) {
      setSelectedFiltersState(
        selectedFiltersState.map((filterGroup) => ({
          ...filterGroup,
          filters: filterGroup.filters.map((filter) => ({
            ...filter,
            isSelected: false,
          })),
        }))
      );
    }
  };

  /**
   * Fetches hotels based on the provided filters.
   * @param {Object} filters - The filters to apply.
   * @returns {Promise<void>}
   * @async
   */
  const fetchHotels = async (filters) => {
    setHotelsResults({
      isLoading: true,
      data: [],
      errors: [],
    });
    const hotelsResultsResponse = await networkAdapter.get('/api/hotels', {
      filters: JSON.stringify(filters),
      currentPage: currentResultsPage,
      advancedFilters: JSON.stringify([
        {
          sortBy: sortByFilterValue.value,
        },
      ]),
    });
    if (hotelsResultsResponse) {
      setHotelsResults({
        isLoading: false,
        data: hotelsResultsResponse.data.elements,
        errors: hotelsResultsResponse.errors,
        metadata: hotelsResultsResponse.metadata,
        pagination: hotelsResultsResponse.paging,
      });
    }
  };

  const getVerticalFiltersData = async () => {
    const filtersDataResponse = await networkAdapter.get(
      'api/hotels/verticalFilters'
    );
    if (filtersDataResponse) {
      setFiltersData({
        isLoading: false,
        data: filtersDataResponse.data.elements,
        errors: filtersDataResponse.errors,
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentResultsPage(page);
  };

  const handlePreviousPageChange = () => {
    setCurrentResultsPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  const handleNextPageChange = () => {
    setCurrentResultsPage((prev) => {
      if (prev >= hotelsResults.pagination.totalPages) return prev;
      return prev + 1;
    });
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
    getVerticalFiltersData();
  }, []);

  // And update location input value if city is present in the URL
  // Also update number of guests input value if numGuests is present in the URL
  useEffect(() => {
    if (searchParams.get('city')) {
      setLocationInputValue(searchParams.get('city'));
    }

    if (searchParams.get('numGuests')) {
      setNumGuestsInputValue(searchParams.get('numGuests'));
    }
  }, [searchParams]);

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
      } else {
        fetchHotels({
          city: locationInputValue,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiltersState, currentResultsPage, sortByFilterValue]);

  // Fetch hotels when location input value changes
  useEffect(() => {
    if (location.state) {
      const { city, numGuest, checkInDate, checkOutDate } = location.state;
      if (numGuest) {
        setNumGuestsInputValue(numGuest.toString());
      }
      setLocationInputValue(city);
      if (checkInDate && checkOutDate) {
        setDateRange([
          {
            startDate: parse(checkInDate, 'dd/MM/yyyy', new Date()),
            endDate: parse(checkOutDate, 'dd/MM/yyyy', new Date()),
            key: 'selection',
          },
        ]);
      }
    }
  }, [location]);

  return (
    <div className="hotels">
      <div className="bg-brand px-2 lg:h-[120px] h-[220px] flex items-center justify-center">
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          locationTypeheadResults={filteredTypeheadResults}
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
      <div className="my-4"></div>
      <div className="w-[180px]"></div>
      <ResultsContainer
        hotelsResults={hotelsResults}
        enableFilters={true}
        filtersData={filtersData}
        onFiltersUpdate={onFiltersUpdate}
        onClearFiltersAction={onClearFiltersAction}
        selectedFiltersState={selectedFiltersState}
        sortByFilterValue={sortByFilterValue}
        onSortingFilterChange={onSortingFilterChange}
        sortingFilterOptions={sortingFilterOptions}
      />
      {hotelsResults.pagination?.totalPages > 1 && (
        <div className="my-4">
          <PaginationController
            currentPage={currentResultsPage}
            totalPages={hotelsResults.pagination?.totalPages}
            handlePageChange={handlePageChange}
            handlePreviousPageChange={handlePreviousPageChange}
            handleNextPageChange={handleNextPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HotelsSearch;
