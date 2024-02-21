import Review from './components/Review';
import React, { useState } from 'react';
import RatingsOverview from './components/RatingsOverview';
import UserRatingsSelector from './components/UserRatingsSelector';
import { networkAdapter } from 'services/NetworkAdapter';
import Toast from 'components/ux/toast/Toast';

/**
 * Renders the user reviews component.
 *
 * @component
 * @param {Object} reviewData - The review data object.
 * @returns {JSX.Element} The user reviews component.
 */
const UserReviews = ({
  reviewData,
  handlePageChange,
  handlePreviousPageChange,
  handleNextPageChange,
}) => {
  const [userRating, setUserRating] = useState(0);

  const [userReview, setUserReview] = useState('');

  const [shouldHideUserRatingsSelector, setShouldHideUserRatingsSelector] =
    useState(false);

  const [toastMessage, setToastMessage] = useState('');

  /**
   * Handles the selected user rating.
   * @param {number} rate - The rating value.
   */
  const handleRating = (rate) => {
    setUserRating(rate);
  };

  const clearToastMessage = () => {
    setToastMessage('');
  };

  const handleReviewSubmit = async () => {
    // TODO: Add validation for userRating and userReview
    // TODO: Add toast for success or failure
    const response = await networkAdapter.put('/api/hotel/addReview', {
      rating: userRating,
      review: userReview,
    });
    if (response && response.data.status) {
      setToastMessage({
        type: 'success',
        message: response.data.status,
      });
    } else {
      setToastMessage({
        type: 'error',
        message: 'Review submission failed',
      });
    }
    setShouldHideUserRatingsSelector(true);
  };

  const handleUserReviewChange = (review) => {
    setUserReview(review);
  };

  const isNextDisabled =
    reviewData.pagination.currentPage >= reviewData.pagination.totalPages
      ? true
      : false;

  const isPreviousDisabled =
    reviewData.pagination.currentPage <= 1 ? true : false;

  const isEmpty = reviewData.data.length === 0;

  return (
    <div className="flex flex-col p-4 border-t">
      <h1 className="text-xl font-bold text-gray-700">User Reviews</h1>
      <div className="flex flex-col md:flex-row py-4 bg-white shadow-sm gap-6">
        {reviewData.data.length === 0 ? (
          <div className="">
            <span className="text-gray-500 italic">
              Be the first to leave a review!
            </span>
          </div>
        ) : (
          <RatingsOverview
            averageRating={reviewData.metadata.averageRating}
            ratingsCount={reviewData.metadata.totalReviews}
            starCounts={reviewData.metadata.starCounts}
          />
        )}
        {shouldHideUserRatingsSelector ? null : (
          <UserRatingsSelector
            userRating={userRating}
            isEmpty={isEmpty}
            handleRating={handleRating}
            userReview={userReview}
            handleReviewSubmit={handleReviewSubmit}
            handleUserReviewChange={handleUserReviewChange}
          />
        )}
      </div>
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.message}
          dismissError={clearToastMessage}
        />
      )}
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
      {reviewData.data.length > 0 && (
        <div className="pagination flex justify-center border-t">
          <nav className="mt-2">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <button
                  disabled={isPreviousDisabled ? true : false}
                  onClick={handlePreviousPageChange}
                  className={`${
                    isPreviousDisabled && 'cursor-not-allowed'
                  } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>
              {Array.from(
                { length: reviewData.pagination.totalPages },
                (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handlePageChange(i + 1)}
                      className={`${
                        parseInt(reviewData.pagination.currentPage) === i + 1
                          ? 'bg-brand text-white'
                          : 'bg-white text-gray-500'
                      }  flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  disabled={isNextDisabled ? true : false}
                  onClick={handleNextPageChange}
                  className={`${
                    isNextDisabled && 'cursor-not-allowed'
                  } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
