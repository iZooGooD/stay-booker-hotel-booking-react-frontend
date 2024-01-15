import Navbar from '../../components/gloabal-navbar/navbar';
import HeroCover from './components/hero-cover/HeroCover';
import PopularLocations from './components/popular-locations/popular-locations';
import { networkAdapter } from '../../services/NetworkAdapter';
import { useState, useEffect } from 'react';

const Home = () => {
  const [popularDestinationsData, setPopularDestinationsData] = useState([]);
  useEffect(() => {
    const getPopularDestinationsData = async () => {
      const response = await networkAdapter.get('/popularDestinations');
      if (response) {
        setPopularDestinationsData(response.data.elements);
      }
    };

    getPopularDestinationsData();
  }, []);
  return (
    <>
      <Navbar />
      <HeroCover />
      <div className="container mx-auto">
        <PopularLocations popularDestinationsData={popularDestinationsData} />
      </div>
    </>
  );
};

export default Home;
