import React, { useState, useEffect } from 'react';
import Toast from 'components/ux/toast/Toast';
import { networkAdapter } from 'services/NetworkAdapter';

/**
 * Renders the user profile details panel.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.userDetails - The user's details.
 * @returns {JSX.Element} The rendered component.
 * */
const ProfileDetailsPanel = ({ userDetails }) => {
  // states to manage the edit mode and user details
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [nationality, setNationality] = useState('');

  // effect to set initial state of user details
  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || '');
      setLastName(userDetails.lastName || '');
      setEmail(userDetails.email || '');
      setPhoneNumber(userDetails.phone || '');
      setNationality(userDetails.country || '');
      setIsEmailVerified(userDetails.isEmailVerified || '');
      setIsPhoneVerified(userDetails.isPhoneVerified || '');
      setDateOfBirth(userDetails.dateOfBirth || '');
    }
  }, [userDetails]);

  const [toastMessage, setToastMessage] = useState('');

  const clearToastMessage = () => {
    setToastMessage('');
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelClick = () => {
    setIsEditMode(!isEditMode);
  };

  /**
   * Handles the save button click event.
   * Updates the user details and sets the edit mode to false.
   * */
  const handleSaveClick = async () => {
    // check if newstate is different from old state
    if (
      firstName === userDetails.firstName &&
      lastName === userDetails.lastName &&
      phoneNumber === userDetails.phone &&
      nationality === userDetails.country
    ) {
      setIsEditMode(false);
      return;
    }

    const updatedUserDetails = {
      firstName,
      lastName,
      phoneNumber,
      country: nationality,
    };
    // Call the API to update the user details
    const response = await networkAdapter.patch(
      '/api/users/update-profile',
      updatedUserDetails
    );
    if (response && response.data.status) {
      setToastMessage({
        type: 'success',
        message: response.data.status,
      });
    } else {
      // revert to original state
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
      setPhoneNumber(userDetails.phone);
      setNationality(userDetails.country);
      setToastMessage({
        type: 'error',
        message: 'Oops, something went wrong. Please try again later.',
      });
    }

    setIsEditMode(false);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg flex flex-col">
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
                label="Firstname"
                value={firstName}
                onChange={setFirstName}
              />
              <TextField
                label="Lastname"
                value={lastName}
                onChange={setLastName}
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
                label="Country"
                value={nationality}
                onChange={setNationality}
              />
            </>
          ) : (
            // Display fields
            <>
              <DisplayField label="Firstname" value={firstName} />
              <DisplayField label="Lastname" value={lastName} />
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
      {toastMessage && (
        <div className="m-2">
          <Toast
            type={toastMessage.type}
            message={toastMessage.message}
            dismissError={clearToastMessage}
          />
        </div>
      )}
    </div>
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
        className="mt-1 border py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm md:text-base  rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </dd>
  </div>
);

export default ProfileDetailsPanel;
