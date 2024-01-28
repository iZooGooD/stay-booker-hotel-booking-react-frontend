const HotelBookingDetailsCard = () => {
  const bookingDetails = {
    total: '6,819.22 INR',
    cancellationPolicy: 'Free cancellation 1 day prior to stay',
    dates: 'Jan 29-30, 2024',
    checkInTime: '3 pm',
    reservation: '1 room, 2 adults',
    roomType: '1 King Bed Standard Non Smoking',
    rateType: 'Best Flexible Rate',
    nightStay: '1 night stay',
    averageNightlyRate: '6,819.22 INR',
    extraPersonCharge: '500.00 INR',
    taxes: '1,040.22 INR',
    taxDetails:
      'Gst - 12% On Inr 0-2500, 12% On Inr 2500 - 7500, 18% On Inr 7500',
  };

  return (
    <div className="mx-2 bg-white shadow-xl rounded-xl overflow-hidden  mt-2 md:mt-0 w-full md:w-auto">
      <div className="px-6 py-4 bg-brand text-white">
        <h2 className="text-xl font-bold">Booking Details</h2>
      </div>
      <div className="p-6 text-sm md:text-base">
        <div className="mb-4">
          <div className="text-lg font-semibold text-gray-800 mb-1">
            Total Price
          </div>
          <div className="text-xl font-bold text-indigo-600">
            {bookingDetails.total}
          </div>
          <div className="text-sm text-green-600">
            {bookingDetails.cancellationPolicy}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Dates & Time</div>
          <div className="text-gray-600">
            {bookingDetails.dates} | Check-in at {bookingDetails.checkInTime}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Reservation</div>
          <div className="text-gray-600">{bookingDetails.reservation}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Room Type</div>
          <div className="text-gray-600">{bookingDetails.roomType}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Rate</div>
          <div className="text-gray-600">
            {bookingDetails.rateType} - {bookingDetails.nightStay}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Avg. Nightly Rate</div>
          <div className="text-gray-600">
            {bookingDetails.averageNightlyRate}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Extra Charges</div>
          <div className="text-gray-600">
            Extra person charge: {bookingDetails.extraPersonCharge}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Taxes</div>
          <div className="text-gray-600">{bookingDetails.taxes}</div>
          <div className="text-xs text-gray-500">
            {bookingDetails.taxDetails}
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <button className="w-full bg-brand-secondary text-white py-2 rounded hover:bg-yellow-600 transition duration-300">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};
export default HotelBookingDetailsCard;
