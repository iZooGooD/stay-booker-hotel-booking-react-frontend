import { useState } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from '../../services/NetworkAdapter';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await networkAdapter.post('/api/login', loginData);
    if (response && response.user) {
      context.triggerAuthCheck();
      navigate('/user-profile');
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  const dismissError = () => {
    setErrorMessage('');
  };

  return (
    <>
      <div className="login__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <form onSubmit={handleLoginSubmit} className="w-full max-w-lg">
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex justify-between">
                <p>{errorMessage}</p>
                <FontAwesomeIcon
                  onClick={dismissError}
                  className="text-red-500 hover:text-red-700 ml-2"
                  icon={faXmark}
                  size="lg"
                />
              </div>
            )}
            <div className="bg-slate-50 my-4 p-3 flex flex-col">
              <small className="text-slate-600">test user details</small>
              <small className="text-slate-600">Email: user1@example.com</small>
              <small className="text-slate-600">Password: password1</small>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log In
              </button>
              <Link
                to="/register"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                New here? Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
