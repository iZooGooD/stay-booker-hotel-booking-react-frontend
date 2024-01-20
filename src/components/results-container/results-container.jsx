import HotelViewCard from '../hotel-view-card/HotelViewCard';
import VerticalFilters from '../vertical-filters/vertical-filters';
const ResultsContainer = (props) => {
  const { hotelsResults, enableFilters, filtersData } = props;

  return (
    <div className="flex gap-x-4 items-start">
      {enableFilters && <VerticalFilters filtersData={filtersData} />}
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
