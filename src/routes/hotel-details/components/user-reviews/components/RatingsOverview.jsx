import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders the ratings overview component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.userRating - The user's rating.
 * @param {number} props.averageRating - The average rating.
 * @param {number} props.ratingsCount - The total count of ratings.
 * @param {number[]} props.starCounts - The count of each star rating.
 * @param {Function} props.handleRating - The function to handle rating changes made by user.
 * @returns {JSX.Element} The rendered component.
 */
const RatingsOverview = ({ averageRating, ratingsCount, starCounts }) => {
  return (
    <div className=" w-full md:w-3/5">
      <div className="text-lg font-semibold text-gray-700">Overall Rating</div>
      <div className="text-3xl font-bold text-gray-700">{averageRating}/5</div>
      <div className="text-sm">Based on {ratingsCount} reviews</div>
      {Object.keys(starCounts)
        .sort((a, b) => b - a)
        .map((starRating) => (
          <div className="flex items-center my-1 gap-x-4" key={starRating}>
            <div className="w-8 pr-2 flex items-center">
              {starRating}{' '}
              <FontAwesomeIcon
                icon={fasStar}
                className="text-yellow-400 ml-1"
              />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
              <div
                className="bg-yellow-400 h-2.5 rounded-full"
                style={{
                  width: `${(starCounts[starRating] / ratingsCount) * 100}%`,
                }}
              ></div>
            </div>
            <span>{starCounts[starRating]}</span>
          </div>
        ))}
    </div>
  );
};

export default RatingsOverview;
