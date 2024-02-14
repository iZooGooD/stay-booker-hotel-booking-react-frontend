import ImageCard from '../image-card/image-card';
import ImageCardSkeleton from '../image-card-skeleton/image-card-skeleton';
import { useNavigate } from 'react-router-dom';

/**
 * A component that displays a list of popular destinations with their respective image cards.
 * @param {Object} props - The component's props.
 * @param {Object} props.popularDestinationsData - The data for popular destinations.
 * @param {boolean} props.popularDestinationsData.isLoading - Indicates if the data is currently loading.
 * @param {Array<Object>} props.popularDestinationsData.data - The list of popular destination objects, each with the following properties:
 *    @param {number} props.popularDestinationsData.data[].code - The unique code for the destination.
 *    @param {string} props.popularDestinationsData.data[].name - The name of the destination.
 *    @param {string} props.popularDestinationsData.data[].imageUrl - The URL of the destination's image.
 * @param {Array<string>} props.popularDestinationsData.errors - Any errors that occurred while fetching the data.
 */
const PopularLocations = (props) => {
  const { popularDestinationsData } = props;
  const navigate = useNavigate();

  const onPopularDestincationCardClick = (city) => {
    navigate('/hotels', {
      state: {
        city: city.toString().toLowerCase(),
      },
    });
  };

  return (
    <div className="my-4">
      <h2 className="text-3xl font-medium text-slate-700 text-center">
        Book Hotels at Popular Destinations
      </h2>
      <div className="flex my-4 gap-x-8 gap-y-4 justify-center flex-wrap">
        {popularDestinationsData.isLoading
          ? Array.from({ length: 5 }, (_, index) => (
              <ImageCardSkeleton key={index} />
            ))
          : popularDestinationsData.data.map((city) => (
              <ImageCard
                key={city.code}
                name={city.name}
                imageUrl={city.imageUrl}
                onPopularDestincationCardClick={onPopularDestincationCardClick}
              />
            ))}
      </div>
    </div>
  );
};
export default PopularLocations;
