import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import HotelsSearch from './routes/listings/HotelsSearch';
import UserProfile from './routes/user-profile/UserProfile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './routes/home/Home';
import { AuthProvider } from './contexts/AuthContext';
import { makeServer } from './mirage/mirageServer';
import HotelDetails from './routes/hotel-details/HotelDetails';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/hotels',
    element: <HotelsSearch />,
  },
  {
    path: '/aboutus',
    element: <HotelsSearch />,
  },
  {
    path: '/user-profile',
    element: <UserProfile />,
  },
  {
    path: '/hotel/:hotelId',
    element: <HotelDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
