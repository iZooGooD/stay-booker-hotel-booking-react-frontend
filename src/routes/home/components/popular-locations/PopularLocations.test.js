import React from 'react';
import { render, screen } from '@testing-library/react';
import PopularLocations from './popular-locations';

// Mock the child components since they are not the focus of the test
jest.mock('../image-card/image-card', () => (props) => (
  <div data-testid="image-card">{props.name}</div>
));
jest.mock('../image-card-skeleton/image-card-skeleton', () => () => (
  <div data-testid="image-card-skeleton"></div>
));

describe('PopularLocations', () => {
  it('renders the header', () => {
    render(
      <PopularLocations
        popularDestinationsData={{ isLoading: false, data: [] }}
      />
    );
    expect(
      screen.getByText(/book hotels at popular destinations/i)
    ).toBeInTheDocument();
  });

  it('renders the correct number of skeletons when loading', () => {
    render(<PopularLocations popularDestinationsData={{ isLoading: true }} />);
    const skeletons = screen.getAllByTestId('image-card-skeleton');
    expect(skeletons).toHaveLength(5);
  });

  it('renders the correct number of image cards when data is provided', () => {
    const popularDestinationsData = {
      isLoading: false,
      data: [
        { code: 'NYC', name: 'New York', imageUrl: 'new-york.jpg' },
        { code: 'LDN', name: 'London', imageUrl: 'london.jpg' },
      ],
    };
    render(
      <PopularLocations popularDestinationsData={popularDestinationsData} />
    );
    const imageCards = screen.getAllByTestId('image-card');
    expect(imageCards).toHaveLength(popularDestinationsData.data.length);
  });

  it('renders the image cards with correct data', () => {
    const popularDestinationsData = {
      isLoading: false,
      data: [{ code: 'NYC', name: 'New York', imageUrl: 'new-york.jpg' }],
    };
    render(
      <PopularLocations popularDestinationsData={popularDestinationsData} />
    );
    expect(screen.getByText('New York')).toBeInTheDocument();
  });
});
