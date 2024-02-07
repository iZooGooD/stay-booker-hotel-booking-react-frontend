import { useState } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from 'services/NetworkAdapter';
import validations from 'utils/validations';
import Toast from 'components/toast/toast';

const ForgotPassword = () => {
  const [success, setsuccess] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
  });
  /**
   * Handles input changes for the login form fields.
   * Updates the loginData state with the field values.
   * @param {Object} e - The event object from the input field.
   */
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState(false);
  const dismissError = () => {
    setErrorMessage('');
  };
  /**
   * Handles the submission of the login form.
   * Attempts to authenticate the user with the provided credentials.
   * Navigates to the user profile on successful login or sets an error message on failure.
   * @param {Object} e - The event object from the form submission.
   */
  const handleforgotsubmit = async (e) => {
    e.preventDefault();

    if (validations.validate('email', loginData.email)) {
      const response = await networkAdapter.post('/api/forgot', loginData);
      if (response) {
        setsuccess(true);
      } else {
        setErrorMessage('Invalid email.');
      }
    } else {
      setErrorMessage('Invalid email.');
    }
  };
  return (
    <>
      <div className="login__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          {success ? (
            <div className="bg-white p-6  md:mx-auto">
              <svg
                viewBox="0 0 24 24"
                className="text-green-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Recovery Email has been sent!
                </h3>
                <p className="text-red-500"> Don't forgot to check you spam </p>
                <div className="py-10 text-center">
                  <Link
                    to="/"
                    className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                  >
                    GO BACK
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleforgotsubmit}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-brand my-2">
                  Reset your password
                </h2>
                <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    autoComplete="username"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  />
                </div>
                {errorMessage && (
                  <Toast
                    type="error"
                    message={errorMessage}
                    dismissError={dismissError}
                  />
                )}
                <div className="flex-wrap items-center justify-between w-[500px]">
                  <button
                    type="submit"
                    className="w-full bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Reset your password
                  </button>
                  <div className="w-[500px] absolute mt-5">
                    <Link
                      to="/login"
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 text-left absolute left-0"
                    >
                      Remember your password? Log in
                    </Link>
                    <Link
                      to="/register"
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 text-right absolute right-0"
                    >
                      New here? Create an account
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
