import React from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Represents a review component.
 * @component
 *
 * @param {Object} props - The props object containing reviewerName, reviewDate, review, and rating.
 * @param {string} props.reviewerName - The name of the reviewer.
 * @param {string} props.reviewDate - The date of the review.
 * @param {string} props.review - The content of the review.
 * @param {number} props.rating - The rating given by the reviewer.
 * @param {boolean} props.verified - Whether the review has been verified or not.
 *
 * @returns {JSX.Element} The rendered Review component.
 */
const Review = (props) => {
  const { reviewerName, reviewDate, review, rating, verified } = props;
  return (
    <div className="py-3 border-t">
      <div className="flex justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-2xl text-gray-300 mr-2"
          />
          <h4 className="font-semibold text-gray-700">
            {reviewerName}{' '}
            {verified && (
              <span className="text-xs font-medium text-green-500">
                (Verified)
              </span>
            )}
          </h4>
        </div>
        <div className="flex items-center mt-4">
          <p className="text-yellow-500 text-md">{rating}</p>
          <svg
            className="w-4 h-4 text-yellow-500 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 12.585l-4.95 3.563 1.9-5.85L2.1 7.852l5.95-.435L10 2l2.95 5.417 5.95.435-4.85 3.563 1.9 5.85L10 12.585z" />
          </svg>
        </div>
      </div>
      <p className="text-gray-500 text-sm">{reviewDate}</p>
      <p className="mt-2">{review}</p>
    </div>
  );
};

export default Review;
