import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { differenceInCalendarDays } from 'date-fns';
import DateRangePicker from 'components/ux/data-range-picker/DateRangePicker';
import { networkAdapter } from 'services/NetworkAdapter';

const HotelBookingDetailsCard = ({ hotelCode }) => {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState({
    value: '1 King Bed Standard Non Smoking',
    label: '1 King Bed Standard Non Smoking',
  });

  const [selectedGuests, setSelectedGuests] = useState({
    value: 2,
    label: '2 guests',
  });

  const [selectedRooms, setSelectedRooms] = useState({
    value: 1,
    label: '1 room',
  });

  const [total, setTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);

  const [bookingPeriodDays, setBookingPeriodDays] = useState(1);

  const [bookingDetails, setBookingDetails] = useState({});

  const guestOptions = Array.from(
    Array(bookingDetails.maxGuestsAllowed),
    (v, i) => {
      return { value: i + 1, label: `${i + 1} guest` };
    }
  );

  const roomNumberOptions = Array.from(
    Array(bookingDetails.maxRoomsAllowedPerGuest),
    (v, i) => {
      return { value: i + 1, label: `${i + 1} room` };
    }
  );

  const roomOptions = [
    {
      value: '1 King Bed Standard Non Smoking',
      label: '1 King Bed Standard Non Smoking',
    },
  ];

  const handleRoomTypeChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    calculatePrices();
  };

  const handleGuestsNumberChange = (selectedOption) => {
    setSelectedGuests(selectedOption);
  };

  const handleRoomsNumberChange = (selectedOption) => {
    setSelectedRooms(selectedOption);
    calculatePrices();
  };

  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  const onDateChangeHandler = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    if (startDate && endDate) {
      const days = differenceInCalendarDays(endDate, startDate) + 1;
      setBookingPeriodDays(days);
    } else {
      setBookingPeriodDays(1);
    }
    calculatePrices();
  };

  const calculatePrices = () => {
    const pricePerNight =
      Number(bookingDetails.currentNightRate) * selectedRooms.value;
    let gstRate;
    if (pricePerNight <= 2500) {
      gstRate = 0.12;
    } else if (pricePerNight > 2500 && pricePerNight <= 7500) {
      gstRate = 0.12;
    } else {
      gstRate = 0.18;
    }
    const totalGst = pricePerNight * bookingPeriodDays * gstRate;
    const totalPrice = pricePerNight * bookingPeriodDays + totalGst;
    setTotal(`${totalPrice} INR`);
    setTaxes(`${totalGst} INR`);
  };

  useEffect(() => {
    calculatePrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingPeriodDays, selectedRooms, selectedRoom, bookingDetails]);

  useEffect(() => {
    const getBookingDetails = async () => {
      const response = await networkAdapter.get(
        `api/hotel/${hotelCode}/booking/enquiry`
      );
      if (response && response.data) {
        setBookingDetails({
          ...bookingDetails,
          ...response.data,
        });
      }
    };
    getBookingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="text-xl font-bold text-indigo-600">{total}</div>
          <div className="text-sm text-green-600">
            {bookingDetails.cancellationPolicy}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Dates & Time</div>
          <div className="text-gray-600">
            <DateRangePicker
              isDatePickerVisible={isDatePickerVisible}
              onDatePickerIconClick={onDatePickerIconClick}
              onDateChangeHandler={onDateChangeHandler}
              setisDatePickerVisible={setisDatePickerVisible}
              dateRange={dateRange}
              inputStyle={'DARK'}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Reservation</div>
          <Select
            value={selectedRooms}
            onChange={handleRoomsNumberChange}
            options={roomNumberOptions}
            className="mb-2"
          />
          <Select
            value={selectedGuests}
            onChange={handleGuestsNumberChange}
            options={guestOptions}
          />
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Room Type</div>
          <Select
            value={selectedRoom}
            onChange={handleRoomTypeChange}
            options={roomOptions}
          />
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Per day rate</div>
          <div className="text-gray-600">
            {bookingDetails.currentNightRate} INR
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Taxes</div>
          <div className="text-gray-600">{taxes}</div>
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
