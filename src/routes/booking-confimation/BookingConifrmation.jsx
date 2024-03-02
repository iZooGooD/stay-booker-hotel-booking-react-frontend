import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BookingConfirmation = () => {
  const bookingDetails = [
    {
      label: 'Booking ID',
      value: 'BKG123',
    },
    {
      label: 'Booking Date',
      value: '2024-01-10',
    },
    {
      label: 'Hotel Name',
      value: 'Seaside Resort',
    },
    {
      label: 'Check-in Date',
      value: '2024-01-20',
    },
    {
      label: 'Check-out Date',
      value: '2024-01-25',
    },
    {
      label: 'Total Fare',
      value: '₹14,500',
    },
  ];
  return (
    <div className="flex mx-auto px-4 py-12 items-center justify-center flex-col my-40 border rounded-md max-w-[800px]">
      <div className="flex items-center justify-center">
        <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl" />
        <FontAwesomeIcon icon={faStar} className="text-gray-400 text-3xl" />
        <FontAwesomeIcon icon={faStar} className="text-gray-400 text-4xl" />
        <FontAwesomeIcon icon={faStar} className="text-gray-400 text-3xl" />
        <FontAwesomeIcon icon={faStar} className="text-gray-400 text-xl" />
      </div>
      <h1 className="text-gray-700 text-2xl font-bold">Booking Confirmed</h1>
      <p className="text-gray-600 mt-2">
        Thank you for your booking! Your reservation has been confirmed.
      </p>
      <p className="text-gray-600">
        Please check your email for the booking details and instructions for
        your stay.
      </p>
      <div className="mt-4 flex justify-center flex-wrap items-center">
        {bookingDetails &&
          bookingDetails.map((detail, index) => (
            <div key={index} className="border-r-2 px-4">
              <p className="text-gray-600 text-sm">{detail.label}</p>
              <span className="text-gray-600 text-sm font-bold">
                {detail.value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default BookingConfirmation;
