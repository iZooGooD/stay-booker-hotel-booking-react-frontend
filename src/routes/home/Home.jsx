import Navbar from '../../components/gloabal-navbar/navbar';
import HeroCover from './components/hero-cover/HeroCover';
import PopularLocations from './components/popular-locations/popular-locations';
import { networkAdapter } from '../../services/NetworkAdapter';
import { useState, useEffect } from 'react';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div className="my-4">
          <h2 className="text-3xl font-medium text-slate-700 text-center">
            Most searched in pune
          </h2>
          <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2">
            <div className="card border p-4 flex flex-col md:flex-row gap-x-2 w-full">
              <div className="w-full md:w-[320px]">
                <img
                  src="/images/hotels/481481762/481481762.jpg"
                  alt="mumbai"
                  className=""
                />
              </div>
              <div className="flex flex-col justify-between ml-0 md:ml-2">
                <div>
                  <h4 className="text-2xl font-bold text-slate-600">
                    Hyatt Pune
                  </h4>
                  <p className="text-slate-600">
                    Kalyani Nagar, Pune | 3.3 kms from city center
                  </p>
                </div>
                <ul>
                  <li className="text-green-800 font-medium text-sm">
                    <FontAwesomeIcon icon={faCheck} /> Free cancellation
                  </li>
                  <li className="text-green-800 font-medium text-sm">
                    <FontAwesomeIcon icon={faCheck} /> No prepayment needed –
                    pay at the property
                  </li>
                </ul>
              </div>
              <div className="flex flex-col ml-0 md:ml-auto justify-between border-l-0 md:border-l-2 items-stretch pl-0 md:pl-4">
                <div className="flex justify-between my-3 md:my-0 items-center md:flex-col md:justify-between w-full h-full">
                  <h4 className="font-medium text-sm text-white bg-brand p-2">
                    8.8 <FontAwesomeIcon icon={faStar} />
                  </h4>
                  <p className="text-slate-600 font-bold whitespace-nowrap">
                    ₹ 18,900
                  </p>
                </div>

                <button className=" bg-brand-secondary px-4 py-2 text-white whitespace-nowrap">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
