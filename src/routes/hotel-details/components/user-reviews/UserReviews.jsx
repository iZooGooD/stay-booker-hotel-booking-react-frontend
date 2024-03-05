import Review from './components/Review';
import React, { useState } from 'react';
import RatingsOverview from './components/RatingsOverview';
import UserRatingsSelector from './components/UserRatingsSelector';
import { networkAdapter } from 'services/NetworkAdapter';
import Toast from 'components/ux/toast/Toast';
import PaginationController from 'components/ux/pagination-controller/PaginationController';
import Loader from 'components/ux/loader/loader';

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
    if (userRating === 0) {
      setToastMessage({
        type: 'error',
        message: 'Please select a rating before submitting.',
      });
      return;
    }
    // TODO: Add validation for userRating and userReview
    const response = await networkAdapter.put('/api/hotel/add-review', {
      rating: userRating,
      review: userReview,
    });
    if (response && response.errors.length === 0 && response.data.status) {
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

  const isEmpty = reviewData.data.length === 0;

  return (
    <div className="flex flex-col p-4 border-t">
      <h1 className="text-xl font-bold text-gray-700">User Reviews</h1>
      <div className="flex flex-col md:flex-row py-4 bg-white shadow-sm gap-6">
        {reviewData.data.length === 0 ? (
          <div className="w-3/5">
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
          <Loader height={'600px'} />
        ) : (
          <div>
            {reviewData.data.map((review, index) => (
              <Review
                key={index}
                reviewerName={review.reviewerName}
                reviewDate={review.date}
                review={review.review}
                rating={review.rating}
                verified={review.verified}
              />
            ))}
          </div>
        )}
      </div>
      {reviewData.data.length > 0 && (
        <PaginationController
          currentPage={reviewData.pagination.currentPage}
          totalPages={reviewData.pagination.totalPages}
          handlePageChange={handlePageChange}
          handlePreviousPageChange={handlePreviousPageChange}
          handleNextPageChange={handleNextPageChange}
        />
      )}
    </div>
  );
};

export default UserReviews;
