import React, { useEffect, useState } from 'react';
import FinalBookingSummary from './components/final-booking-summary/FinalBookingSummary';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getReadableMonthFormat } from 'utils/date-helpers';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';

/**
 * Checkout component for processing payments and collecting user information.
 *
 * @returns {JSX.Element} The rendered Checkout component.
 */
const Checkout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  // Format the check-in and check-out date and time
  const checkInDateTime = `${getReadableMonthFormat(
    searchParams.get('checkIn')
  )}, ${location.state?.checkInTime}`;
  const checkOutDateTime = `${getReadableMonthFormat(
    searchParams.get('checkOut')
  )}, ${location.state?.checkOutTime}`;

  const { isAuthenticated, userDetails } = useContext(AuthContext);

  useEffect(() => {
    const locationState = location.state;
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    if (!locationState || !checkIn || !checkOut) {
      const hotelCode = searchParams.get('hotelCode');
      navigate(`/hotel/${hotelCode}`);
    }
  }, [location, navigate, searchParams]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = validationSchema[name](value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: !isValid });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const isFieldValid = validationSchema[field](formData[field]);
      newErrors[field] = !isFieldValid;
      isValid = isValid && isFieldValid;
    });

    setErrors(newErrors);

    if (!isValid) {
      console.log('Validation errors:', newErrors);
      return; // Stop form submission if there are errors
    }

    // If all validations pass
    console.log('Paying:', formData);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <FinalBookingSummary
        hotelName={searchParams.get('hotelName')}
        checkIn={checkInDateTime}
        checkOut={checkOutDateTime}
        isAuthenticated={isAuthenticated}
        phone={userDetails?.phone}
        email={userDetails?.email}
        fullName={userDetails?.fullName}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg mx-auto"
      >
        <InputField
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required={true}
          error={errors.email}
        />
        <InputField
          label="Name on card"
          type="text"
          name="nameOnCard"
          value={formData.nameOnCard}
          onChange={handleChange}
          placeholder="Name as it appears on card"
          required={true}
          error={errors.nameOnCard}
        />
        <InputField
          label="Card number"
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="0000 0000 0000 0000"
          required={true}
          error={errors.cardNumber}
        />
        <div className="flex mb-4 justify-between">
          <InputField
            label="Expiration date (MM/YY)"
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            required={true}
            error={errors.expiry}
          />
          <InputField
            label="CVC"
            type="text"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            placeholder="CVC"
            required={true}
            error={errors.cvc}
          />
        </div>
        <InputField
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Street Address"
          required={true}
          error={errors.address}
        />
        <InputField
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required={true}
          error={errors.city}
        />
        <div className="flex mb-4 justify-between">
          <InputField
            label="State / Province"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required={true}
            error={errors.state}
          />
          <InputField
            label="Postal code"
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required={true}
            error={errors.postalCode}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300"
            type="submit"
          >
            Pay ₹ {location.state?.total}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
}) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className={`shadow appearance-none border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      aria-invalid={error ? 'true' : 'false'}
    />
    {error && (
      <p className="text-red-500 text-xs italic">Please check this field.</p>
    )}
  </div>
);

const validationSchema = {
  email: (value) => /\S+@\S+\.\S+/.test(value),
  nameOnCard: (value) => value.trim() !== '',
  cardNumber: (value) => /^\d{16}$/.test(value), // Simplistic validation: just check if it has 16 digits.
  expiry: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), // MM/YY format
  cvc: (value) => /^\d{3,4}$/.test(value), // 3 or 4 digits
  address: (value) => value.trim() !== '',
  city: (value) => value.trim() !== '',
  state: (value) => value.trim() !== '',
  postalCode: (value) => /^\d{5}(-\d{4})?$/.test(value),
};

export default Checkout;
