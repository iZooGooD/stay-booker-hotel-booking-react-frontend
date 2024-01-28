import HotelBookingDetailsCard from '../hotel-booking-details-card/HotelBookingDetailsCard';

const HotelDetailsViewCard = ({ hotelDetails }) => {
  return (
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
          <p className="text-sm text-gray-600 mb-4">{hotelDetails.subtitle}</p>
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
      <HotelBookingDetailsCard />
    </div>
  );
};

export default HotelDetailsViewCard;
