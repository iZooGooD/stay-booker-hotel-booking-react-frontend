import React, { useState, useEffect, useRef } from 'react';
import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';
import Tabs from '../../components/sb-tabs/tabs/Tabs';
import TabPanel from '../../components/sb-tabs/tab-panel/TabPanel';
import {
  faAddressCard,
  faHotel,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';
import { networkAdapter } from '../../services/NetworkAdapter';
import { useContext } from 'react';
import PaymentMethodsPanel from './components/PaymentsMethodsPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';
import GlobalFooter from '../../components/global-footer/GlobalFooter';

/**
 * User profile page
 */
const UserProfile = () => {
  const { userDetails } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [nationality, setNationality] = useState('');
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isTabsVisible, setIsTabsVisible] = useState(false);

  const [userBookingsData, setUserBookingsData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  const wrapperRef = useRef();
  const buttonRef = useRef();

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsTabsVisible(false);
    }
  });

  useEffect(() => {
    if (userDetails) {
      setFullName(userDetails.fullName || '');
      setEmail(userDetails.email || '');
      setPhoneNumber(userDetails.phone || '');
      setNationality(userDetails.country || '');
      setIsEmailVerified(userDetails.isEmailVerified || '');
      setIsPhoneVerified(userDetails.isPhoneVerified || '');
    }
  }, [userDetails]);

  useEffect(() => {
    const getInitialData = async () => {
      const userBookingsDataResponse =
        await networkAdapter.get('/api/bookings');
      if (userBookingsDataResponse) {
        setUserBookingsData({
          isLoading: false,
          data: userBookingsDataResponse.data.elements,
          errors: userBookingsDataResponse.errors,
        });
      }
    };
    getInitialData();
  }, []);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = () => {
    // Perform save logic here
    setIsEditMode(false);
  };

  const onTabsMenuButtonAction = () => {
    setIsTabsVisible(!isTabsVisible);
  };

  return (
    <>
      <GlobalNavbar />
      <div className="container mx-auto p-4 my-10 min-h-[530px]">
        <div className="mx-4">
          <button
            ref={buttonRef}
            onClick={onTabsMenuButtonAction}
            className="block md:hidden items-center px-4 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon
              icon={isTabsVisible ? faXmark : faBars}
              size="lg"
            />
          </button>
        </div>
        <Tabs isTabsVisible={isTabsVisible} wrapperRef={wrapperRef}>
          <TabPanel label="Personal Details" icon={faAddressCard}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Personal details
                </h3>
                <p className="mt-1 max-w-2xl text-gray-500">
                  Keep your details current to ensure seamless communication and
                  services
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  {isEditMode ? (
                    // Editable fields
                    <>
                      <TextField
                        label="Name"
                        value={fullName}
                        onChange={setFullName}
                      />
                      <TextField
                        label="Email address"
                        value={email}
                        onChange={setEmail}
                      />
                      <TextField
                        label="Phone number"
                        type="tel"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                      <TextField
                        label="Date of birth"
                        type="date"
                        value={dateOfBirth}
                        onChange={setDateOfBirth}
                      />
                      <TextField
                        label="Nationality"
                        value={nationality}
                        onChange={setNationality}
                      />
                    </>
                  ) : (
                    // Display fields
                    <>
                      <DisplayField label="Name" value={fullName} />
                      <DisplayField
                        label="Email address"
                        value={email}
                        verified={isEmailVerified}
                      />
                      <DisplayField
                        label="Phone number"
                        value={phoneNumber || 'Add your phone number'}
                        verified={isPhoneVerified}
                      />
                      <DisplayField
                        label="Date of birth"
                        value={dateOfBirth || 'Enter your date of birth'}
                      />
                      <DisplayField label="Nationality" value={nationality} />
                    </>
                  )}
                </dl>
              </div>
              <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleCancelClick}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveClick}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel label="Bookings" icon={faHotel}>
            <BookingPanel bookings={userBookingsData.data} />
          </TabPanel>
          <TabPanel label="Payment details" icon={faCreditCard}>
            <PaymentMethodsPanel
              paymentMethods={paymentMethods}
              setPaymentMethods={setPaymentMethods}
            />
          </TabPanel>
        </Tabs>
      </div>
      <GlobalFooter />
    </>
  );
};

const DisplayField = ({ label, value, verified }) => (
  <div
    className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
      verified ? 'bg-gray-50' : ''
    }`}
  >
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
      {value}{' '}
      {verified && <span className="text-green-500 font-medium">Verified</span>}
    </dd>
  </div>
);

const TextField = ({ label, value, onChange, type = 'text' }) => (
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 sm:mt-0 sm:col-span-2">
      <input
        type={type}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-sm md:text-base border-gray-300 rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </dd>
  </div>
);

const BookingPanel = ({ bookings }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {bookings.map((booking, index) => (
          <li key={index} className="bg-white hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand truncate">
                  {booking.hotelName}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Booking ID: {booking.bookingId}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex gap-x-2">
                  <p className="flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-4 4V3m0 4v8m-4-4h8"
                      />
                    </svg>
                    Booking Date: {booking.bookingDate}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 10l5 5 5-5m-5 5V3"
                      />
                    </svg>
                    Check-in: {booking.checkInDate}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 10l5 5 5-5m-5 5V3"
                      />
                    </svg>
                    Check-out: {booking.checkOutDate}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p className="flex items-center">
                    <span className="font-medium">Total Fare: </span>{' '}
                    <span className="ml-2">{booking.totalFare}</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mockPaymentMethods = [
  {
    cardType: 'Visa',
    cardNumber: '**** **** **** 1234',
    expiryDate: '08/26',
  },
  {
    cardType: 'MasterCard',
    cardNumber: '**** **** **** 5678',
    expiryDate: '07/24',
  },
  {
    cardType: 'American Express',
    cardNumber: '**** **** **** 9012',
    expiryDate: '05/25',
  },
];

export default UserProfile;
