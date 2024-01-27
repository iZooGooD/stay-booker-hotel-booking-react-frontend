import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { networkAdapter } from '../../services/NetworkAdapter';
import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const response = await networkAdapter.get(`/api/hotel/${hotelId}`);
      setHotelDetails(response.data);
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalNavbar />
      <div className="flex items-start justify-center flex-wrap container mx-auto p-4">
        <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              className="w-full h-72 object-cover"
              src={hotelDetails.image.imageUrl}
              alt={hotelDetails.image.accessibleText}
            />
            {hotelDetails.discount && (
              <div className="absolute top-0 right-0 m-4 px-2 py-1 bg-yellow-500 text-white font-semibold text-xs rounded">
                {hotelDetails.discount} OFF
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {hotelDetails.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {hotelDetails.subtitle}
            </p>
            <div className="mt-2 space-y-2">
              {hotelDetails.description.map((line, index) => (
                <p key={index} className="text-gray-700">
                  {line}
                </p>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-600">
                  {hotelDetails.benefits.join(' | ')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <BookingDetailsCard />
      </div>
    </>
  );
};

const BookingDetailsCard = () => {
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

export default HotelDetails;
