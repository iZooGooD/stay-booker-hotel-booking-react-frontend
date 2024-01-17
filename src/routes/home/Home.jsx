import Navbar from '../../components/gloabal-navbar/navbar';
import HeroCover from './components/hero-cover/HeroCover';
import PopularLocations from './components/popular-locations/popular-locations';
import { networkAdapter } from '../../services/NetworkAdapter';
import { useState, useEffect } from 'react';

const Home = () => {
  const [popularDestinationsData, setPopularDestinationsData] = useState([]);
  useEffect(() => {
    const getPopularDestinationsData = async () => {
      const response = await networkAdapter.get('/api/popularDestinations');
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
        <div className="my-4">
          <h2 className="text-3xl font-medium text-slate-700 text-center">
            Most searched in pune
          </h2>
          <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
