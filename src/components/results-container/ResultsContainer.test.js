import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsContainer from './ResultsContainer';

// Mock the child components
jest.mock('../../components/hotel-view-card/HotelViewCard', () => (props) => (
  <div data-testid="hotel-view-card">{props.title}</div>
));

jest.mock(
  '../../components/hotel-view-card-skeleton/HotelViewCardSkeleton',
  () => () => (
    <div data-testid="hotel-view-card-skeleton">HotelViewCardSkeleton</div>
  )
);

jest.mock(
  '../../components/vertical-filters/VerticalFilters',
  () =>
    ({ filtersData, onFiltersUpdate }) => {
      return (
        <div data-testid="vertical-filters">
          {filtersData.map((group) =>
            group.filters.map((filter) => (
              <button
                key={filter.id}
                data-testid={`filter-${filter.id}`}
                onClick={() =>
                  onFiltersUpdate({ filterId: group.filterId, id: filter.id })
                }
              >
                {filter.title}
              </button>
            ))
          )}
        </div>
      );
    }
);

jest.mock(
  '../../components/vertical-filters-skeleton/vertical-filters-skeleton',
  () => () => (
    <div data-testid="vertical-filters-skeleton">VerticalFiltersSkeleton</div>
  )
);

// Define mock data for the filters
const mockFiltersData = {
  isLoading: false,
  data: [
    {
      filterId: 'star_ratings',
      title: 'Star ratings',
      filters: [
        {
          id: '5_star_rating',
          title: '5 Star',
        },
        {
          id: '4_star_rating',
          title: '4 Star',
        },
        {
          id: '3_star_rating',
          title: '3 Star',
        },
      ],
    },
    {
      filterId: 'propety_type',
      title: 'Property type',
      filters: [
        {
          id: 'prop_type_hotel',
          title: 'Hotel',
        },
        {
          id: 'prop_type_apartment',
          title: 'Apartment',
        },
        {
          id: 'prop_type_villa',
          title: 'Villa',
        },
      ],
    },
  ],
};

const mockHotelsResults = {
  isLoading: false,
  data: [
    {
      hotelCode: 81331,
      image: {
        imageUrl: '/images/hotels/348592039/348592039.jpg',
        accessibleText: 'Taj Mahal Palace Mumbai',
      },
      title: 'The Taj Mahal Palace, Mumbai',
      subtitle: 'Apollo Bunder, Mumbai | 2.5 kms from city center',
      benefits: [
        'Free cancellation',
        'Pay later option available',
        'Free breakfast',
      ],
      price: '35,000',
      ratings: '9.2',
      city: 'mumbai',
    },
    {
      hotelCode: 81332,
      image: {
        imageUrl: '/images/hotels/500213112/500213112.jpg',
        accessibleText: 'Oberoi Mumbai',
      },
      title: 'The Oberoi Mumbai',
      subtitle: 'Nariman Point, Mumbai | 3 kms from city center',
      benefits: ['Ocean view rooms', 'Free wifi', 'Spa services'],
      price: '30,750',
      ratings: '9.5',
      city: 'mumbai',
    },
    {
      hotelCode: 81333,
      image: {
        imageUrl: '/images/hotels/114422003/114422003.jpg',
        accessibleText: 'Trident Bandra Kurla Mumbai',
      },
      title: 'Trident Bandra Kurla',
      subtitle: 'Bandra Kurla Complex, Mumbai | 8 kms from city center',
      benefits: ['Free cancellation', 'Fitness center', 'Business facilities'],
      price: '27,999',
      ratings: '8.9',
      city: 'mumbai',
    },
    {
      hotelCode: 81334,
      image: {
        imageUrl: '/images/hotels/324668211/324668211.jpg',
        accessibleText: 'Four Seasons Mumbai',
      },
      title: 'Four Seasons Hotel Mumbai',
      subtitle: 'Worli, Mumbai | 4.1 kms from city center',
      benefits: ['Rooftop bar', 'Infinity pool', 'Spa and wellness center'],
      price: '28,500',
      ratings: '8.7',
      city: 'mumbai',
    },
    {
      hotelCode: 81335,
      image: {
        imageUrl: '/images/hotels/678321044/678321044.jpg',
        accessibleText: 'St. Regis Mumbai',
      },
      title: 'The St. Regis Mumbai',
      subtitle: 'Lower Parel, Mumbai | 3.8 kms from city center',
      benefits: ['Butler service', 'Exclusive club lounge', 'Luxury spa'],
      price: '33,200',
      ratings: '9.1',
      city: 'mumbai',
    },
  ],
};

describe('ResultsContainer', () => {
  it('renders hotel view cards when not loading', () => {
    render(
      <ResultsContainer
        hotelsResults={mockHotelsResults}
        enableFilters={false}
        filtersData={mockFiltersData}
      />
    );
    expect(screen.getAllByTestId('hotel-view-card')).toHaveLength(
      mockHotelsResults.data.length
    );
  });

  it('renders hotel view card skeletons when loading', () => {
    render(
      <ResultsContainer
        hotelsResults={{ ...mockHotelsResults, isLoading: true }}
        enableFilters={false}
        filtersData={mockFiltersData}
      />
    );
    expect(screen.getAllByTestId('hotel-view-card-skeleton')).toHaveLength(5);
  });

  it('renders vertical filters when filters are enabled and not loading', () => {
    render(
      <ResultsContainer
        hotelsResults={mockHotelsResults}
        enableFilters={true}
        filtersData={mockFiltersData}
      />
    );
    expect(screen.getByTestId('vertical-filters')).toBeInTheDocument();
  });

  it('renders vertical filters skeleton when filters are enabled and loading', () => {
    render(
      <ResultsContainer
        hotelsResults={mockHotelsResults}
        enableFilters={true}
        filtersData={{ ...mockFiltersData, isLoading: true }}
      />
    );
    expect(screen.getByTestId('vertical-filters-skeleton')).toBeInTheDocument();
  });
});
