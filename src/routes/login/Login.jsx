import { useState } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from 'services/NetworkAdapter';
import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import validations from 'utils/validations';
import Toast from 'components/ux/toast/Toast';
import { LOGIN_MESSAGES } from 'utils/constants';

/**
 * Login Component
 * Renders a login form allowing users to sign in to their account.
 * It handles user input for email and password, submits login credentials to the server,
 * and navigates the user to their profile upon successful authentication.
 * Displays an error message for invalid login attempts.
 */
const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(false);

  /**
   * Handles input changes for the login form fields.
   * Updates the loginData state with the field values.
   * @param {Object} e - The event object from the input field.
   */
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the submission of the login form.
   * Attempts to authenticate the user with the provided credentials.
   * Navigates to the user profile on successful login or sets an error message on failure.
   * @param {Object} e - The event object from the form submission.
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (validations.validate('email', loginData.email)) {
      const response = await networkAdapter.post('api/users/login', loginData);
      if (response && response.data.token) {
        context.triggerAuthCheck();
        navigate('/user-profile');
      } else if (response && response.errors.length > 0) {
        setErrorMessage(response.errors[0]);
      }
    } else {
      setErrorMessage(LOGIN_MESSAGES.FAILED);
    }
  };

  /**
   * Clears the current error message displayed to the user.
   */
  const dismissError = () => {
    setErrorMessage('');
  };

  return (
    <>
      <div className="login__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <form
            onSubmit={handleLoginSubmit}
            className="w-full max-w-lg p-4 md:p-10 shadow-md"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-brand">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Log in to continue to your account
              </p>
            </div>
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
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            {errorMessage && (
              <Toast
                type="error"
                message={errorMessage}
                dismissError={dismissError}
              />
            )}
            <div className="items-center">
              <div>
                <button
                  type="submit"
                  className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Log In
                </button>
              </div>
              <div className="flex flex-wrap justify-center my-3 w-full">
                <Link
                  to="/forgot-password"
                  className="inline-block align-baseline text-md text-gray-500 hover:text-blue-800 text-right"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-0 right-0 flex justify-center items-center">
                  <div className="border-t w-full absolute"></div>
                  <span className="bg-white px-3 text-gray-500 z-10">
                    New to Stay Booker?
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center my-3 w-full mt-12">
                <Link
                  to="/register"
                  className="inline-block align-baseline font-medium text-md text-brand hover:text-blue-800 text-right"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-slate-50 flex flex-col mx-auto w-full max-w-lg px-4">
        <small className="text-slate-600">test user details</small>
        <small className="text-slate-600">Email: user1@example.com</small>
        <small className="text-slate-600">Password: password1</small>
      </div>
    </>
  );
};

export default Login;
