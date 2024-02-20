import React from 'react';

const FinalBookingSummary = ({
  hotelName,
  checkIn,
  checkOut,
  isAuthenticated,
  phone,
  email,
  fullName,
}) => {
  return (
    <div className="bg-white border-gray-200 border rounded-lg p-6 mb-6 shadow w-full max-w-lg mx-auto mt-4">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{hotelName}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm font-semibold text-gray-600">Check-in</p>
            <p className="text-sm text-gray-800">{checkIn}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Check-out</p>
            <p className="text-sm text-gray-800">{checkOut}</p>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm font-semibold text-gray-600">
            Booking details will be sent to:
          </p>
          <p className="text-sm text-gray-800">{fullName} (Primary)</p>
          <p className="text-sm text-gray-800">{email}</p>
          <p className="text-sm text-gray-800">{phone}</p>
        </div>
      )}
    </div>
  );
};

export default FinalBookingSummary;
