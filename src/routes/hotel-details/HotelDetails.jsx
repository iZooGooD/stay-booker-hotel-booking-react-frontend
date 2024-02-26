import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { networkAdapter } from 'services/NetworkAdapter';
import HotelDetailsViewCard from './components/hotel-details-view-card/HotelDetailsViewCard';
import HotelDetailsViewCardSkeleton from './components/hotel-details-view-card-skeleton/HotelDetailsViewCardSkeleton';

/**
 * Represents the hotel details component.
 * @component
 * @returns {JSX.Element} The hotel details component.
 */
const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState({
    isLoading: true,
    data: {},
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const response = await networkAdapter.get(`/api/hotel/${hotelId}`);
      setHotelDetails({
        isLoading: false,
        data: response.data,
      });
    };

    fetchHotelDetails();
  }, [hotelId]);

  return (
    <>
      {hotelDetails.isLoading ? (
        <HotelDetailsViewCardSkeleton />
      ) : (
        <HotelDetailsViewCard hotelDetails={hotelDetails.data} />
      )}
    </>
  );
};

export default HotelDetails;
