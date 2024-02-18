import Review from './components/Review';
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
          averageRating={reviewData.metadata.averageRating}
          ratingsCount={reviewData.metadata.totalReviews}
          starCounts={reviewData.metadata.starCounts}
        />
      </div>
      <div>
        {reviewData.isLoading ? (
          <span>Loading...</span>
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
