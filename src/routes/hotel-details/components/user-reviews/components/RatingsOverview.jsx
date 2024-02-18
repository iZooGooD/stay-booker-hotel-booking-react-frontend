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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const RatingsOverview = ({
  userRating,
  averageRating,
  ratingsCount,
  starCounts,
  handleRating,
}) => {
  return (
    <div className="flex py-4 bg-white shadow-sm gap-x-6">
      <div className="w-3/5">
        <div className="text-lg font-semibold text-gray-700">
          Overall Rating
        </div>
        <div className="text-3xl font-bold text-gray-700">
          {averageRating}/5
        </div>
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

      <div className="w-2/5 pl-4 border-l flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-gray-700">Your Rating</div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={star <= userRating ? fasStar : farStar}
              className={`cursor-pointer mx-1 text-2xl ${
                star <= userRating ? 'text-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        <button
          className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 w-full"
          onClick={() => {}}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RatingsOverview;
