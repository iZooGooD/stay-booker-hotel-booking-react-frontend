import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { differenceInCalendarDays } from 'date-fns';
import DateRangePicker from 'components/ux/data-range-picker/DateRangePicker';
import { networkAdapter } from 'services/NetworkAdapter';
import { DEFAULT_TAX_DETAILS } from 'utils/constants';

/**
 * A component that displays the booking details for a hotel, including date range, room type, and pricing.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.hotelCode - The unique code for the hotel.
 */
const HotelBookingDetailsCard = ({ hotelCode }) => {
  // State for date picker visibility
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  // State for date range
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  // State for selected room, guests, and rooms
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

  // State for pricing and booking details
  const [total, setTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [bookingPeriodDays, setBookingPeriodDays] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({});

  // Options for guests and rooms
  const guestOptions = Array.from(
    { length: bookingDetails.maxGuestsAllowed },
    (_, i) => ({ value: i + 1, label: `${i + 1} guest` })
  );
  const roomNumberOptions = Array.from(
    { length: bookingDetails.maxRoomsAllowedPerGuest },
    (_, i) => ({ value: i + 1, label: `${i + 1} room` })
  );
  const roomOptions = [
    {
      value: '1 King Bed Standard Non Smoking',
      label: '1 King Bed Standard Non Smoking',
    },
  ];

  // Handlers for select changes
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

  // Handler for date picker visibility toggle
  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  /**
   * Handler for date range changes. Updates the booking period days and recalculates prices.
   *
   * @param {Object} ranges - The selected date ranges.
   */
  const onDateChangeHandler = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    const days =
      startDate && endDate
        ? differenceInCalendarDays(endDate, startDate) + 1
        : 1;
    setBookingPeriodDays(days);
    calculatePrices();
  };

  /**
   * Calculates the total price and taxes based on the selected room and booking period.
   */
  const calculatePrices = () => {
    const pricePerNight = bookingDetails.currentNightRate * selectedRooms.value;
    const gstRate =
      pricePerNight <= 2500 ? 0.12 : pricePerNight > 7500 ? 0.18 : 0.12;
    const totalGst = (pricePerNight * bookingPeriodDays * gstRate).toFixed(2);
    const totalPrice = (
      pricePerNight * bookingPeriodDays +
      parseFloat(totalGst)
    ).toFixed(2);
    if (!isNaN(totalPrice)) {
      setTotal(`${totalPrice} INR`);
    }
    setTaxes(`${totalGst} INR`);
  };

  // Effect for initial price calculation
  useEffect(() => {
    calculatePrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingPeriodDays, selectedRooms, selectedRoom, bookingDetails]);

  // Effect for fetching booking details
  useEffect(() => {
    const getBookingDetails = async () => {
      const response = await networkAdapter.get(
        `api/hotel/${hotelCode}/booking/enquiry`
      );
      if (response && response.data) {
        setBookingDetails(response.data);
      }
    };
    getBookingDetails();
  }, [hotelCode]);

  return (
    <div className="mx-2 bg-white shadow-xl rounded-xl overflow-hidden mt-2 md:mt-0 w-full md:w-[380px]">
      <div className="px-6 py-4 bg-brand text-white">
        <h2 className="text-xl font-bold">Booking Details</h2>
      </div>
      <div className="p-6 text-sm md:text-base">
        {/* Total Price */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-gray-800 mb-1">
            Total Price
          </div>
          <div className="text-xl font-bold text-indigo-600">{total}</div>
          <div className="text-sm text-green-600">
            {bookingDetails.cancellationPolicy}
          </div>
        </div>

        {/* Dates & Time */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Dates & Time</div>
          <div className="text-gray-600">
            <DateRangePicker
              isDatePickerVisible={isDatePickerVisible}
              onDatePickerIconClick={onDatePickerIconClick}
              onDateChangeHandler={onDateChangeHandler}
              setisDatePickerVisible={setisDatePickerVisible}
              dateRange={dateRange}
              inputStyle="DARK"
            />
          </div>
        </div>

        {/* Reservation */}
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

        {/* Room Type */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Room Type</div>
          <Select
            value={selectedRoom}
            onChange={handleRoomTypeChange}
            options={roomOptions}
          />
        </div>

        {/* Per day rate */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Per day rate</div>
          <div className="text-gray-600">
            {bookingDetails.currentNightRate} INR
          </div>
        </div>

        {/* Taxes */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Taxes</div>
          <div className="text-gray-600">{taxes}</div>
          <div className="text-xs text-gray-500">{DEFAULT_TAX_DETAILS}</div>
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
