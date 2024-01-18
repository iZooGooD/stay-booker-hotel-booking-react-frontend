import HotelViewCard from '../hotel-view-card/HotelViewCard';
const ResultsContainer = (props) => {
  const { hotelsResults } = props;
  return (
    <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2">
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
  );
};

export default ResultsContainer;
