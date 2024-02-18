import Review from './components/Review';
import Loader from 'components/loader/Loader';
import React, { useState } from 'react';
import RatingsOverview from './components/RatingsOverview';

/**
 * Renders the user reviews component.
 *
 * @component
 * @param {Object} reviewData - The review data object.
 * @returns {JSX.Element} The user reviews component.
 */
const UserReviews = ({ reviewData }) => {
  const [userRating, setUserRating] = useState(0);
  const totalRatings = reviewData.data.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const ratingsCount = reviewData.data.length;
  const averageRating = (totalRatings / ratingsCount).toFixed(1);

  // Count how many times each rating occurs
  const starCounts = Array.from(
    { length: 5 },
    (_, i) =>
      reviewData.data.filter((review) => Math.floor(review.rating) === 5 - i)
        .length
  );

  /**
   * Handles the selected user rating.
   * @param {number} rate - The rating value.
   */
  const handleRating = (rate) => {
    setUserRating(rate);
  };

  return (
    <div className="p-4 border-t">
      <h1 className="text-xl font-bold text-gray-700">User Reviews</h1>
      <div>
        <RatingsOverview
          userRating={userRating}
          handleRating={handleRating}
          averageRating={averageRating}
          ratingsCount={ratingsCount}
          starCounts={starCounts}
        />
      </div>
      <div>
        {reviewData.isLoading ? (
          <Loader />
        ) : (
          <div>
            {reviewData.data.map((review, index) => (
              <Review
                key={index}
                reviewerName={review.reviewerName}
                reviewDate={review.date}
                review={review.review}
                rating={review.rating}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pagination">
        <button className="bg-slate-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 w-full">
          Load More
        </button>
      </div>
    </div>
  );
};

export default UserReviews;
