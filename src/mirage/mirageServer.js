import { createServer, Model, Response } from 'miragejs';
import hotelsData from './data/hotels.json';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      // Define other models here if needed
    },

    seeds(server) {
      // Seed your server with initial data if necessary
    },

    routes() {
      this.namespace = 'api';

      this.get('/user', () => {
        return new Response(200, {}, { name: 'John' });
      });

      this.get('/authUser', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              isAuthenticated: true,
              userId: '23122',
            },
          }
        );
      });

      this.get('/popularDestinations', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: [
                {
                  code: 1211,
                  name: 'Mumbai',
                  imageUrl: '/images/cities/mumbai.jpg',
                },
                {
                  code: 1212,
                  name: 'Bangkok',
                  imageUrl: '/images/cities/bangkok.jpg',
                },
                {
                  code: 1213,
                  name: 'London',
                  imageUrl: '/images/cities/london.jpg',
                },
                {
                  code: 1214,
                  name: 'Dubai',
                  imageUrl: '/images/cities/dubai.jpg',
                },
                {
                  code: 1215,
                  name: 'Oslo',
                  imageUrl: '/images/cities/oslo.jpg',
                },
              ],
            },
          }
        );
      });

      this.get('/nearbyHotels', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: [
                {
                  hotelCode: 71222,
                  image: {
                    imageUrl: '/images/hotels/481481762/481481762.jpg',
                    accessibleText: 'hyatt pune hotel',
                  },
                  title: 'Hyatt Pune',
                  subtitle: 'Kalyani Nagar, Pune | 3.3 kms from city center',
                  benefits: [
                    'Free cancellation',
                    'No prepayment needed – pay at the property',
                  ],
                  price: '18,900',
                  ratings: '8.8',
                  city: 'pune',
                },
                {
                  hotelCode: 71223,
                  image: {
                    imageUrl: '/images/hotels/465660377/465660377.jpg',
                    accessibleText: 'Courtyard by Marriott Pune',
                  },
                  title: 'Courtyard by Marriott Pune Hinjewadi',
                  subtitle: '500 meters from the Rajiv Gandhi Infotech Park',
                  benefits: [
                    'Free cancellation',
                    'No prepayment needed – pay at the property',
                    'Free wifi',
                    'Free lunch',
                  ],
                  price: '25,300',
                  ratings: '8.8',
                  city: 'pune',
                },
                {
                  hotelCode: 71224,
                  image: {
                    imageUrl: '/images/hotels/469186143/469186143.jpg',
                    accessibleText: 'The Westin Pune Koregaon Park',
                  },
                  title: 'The Westin Pune Koregaon Park',
                  subtitle: '5.4 km from centre',
                  benefits: [
                    'Free cancellation',
                    'No prepayment needed – pay at the property',
                    'Free wifi',
                  ],
                  price: '11,300',
                  ratings: '5.8',
                  city: 'pune',
                },
                {
                  hotelCode: 71225,
                  image: {
                    imageUrl: '/images/hotels/252004905/252004905.jpg',
                    accessibleText: 'Novotel Pune Viman Nagar Road',
                  },
                  title: 'Novotel Pune Viman Nagar Road',
                  subtitle: 'Weikfield IT City Infopark | 7.1 km from centre',
                  benefits: [
                    'Pets allowed',
                    'Dinner + Lunch included',
                    'Free wifi',
                    'Free taxi from airport',
                  ],
                  price: '14,599',
                  ratings: '7.8',
                  city: 'pune',
                },
                {
                  hotelCode: 71226,
                  image: {
                    imageUrl: '/images/hotels/54360345/54360345.jpg',
                    accessibleText: 'Vivanta Pune',
                  },
                  title: 'Vivanta Pune',
                  subtitle: 'Xion Complex, | 14.2 km from centre',
                  benefits: [
                    'Pets allowed',
                    'Free wifi',
                    'Free cancellation',
                    'No prepayment needed – pay at the property',
                  ],
                  price: '9,799',
                  ratings: '9.3',
                  city: 'pune',
                },
              ],
            },
          }
        );
      });

      this.get('/hotels', (schema, request) => {
        const filters = request.queryParams.filters;
        const parsedFilters = JSON.parse(filters);
        const city = parsedFilters.city;
        const filteredResults = hotelsData.filter(
          (hotel) => hotel.city === city
        );
        console.log('city', city);
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: filteredResults,
            },
          }
        );
      });

      this.get('/availableCities', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: ['pune', 'bangalore', 'mumbai'],
            },
          }
        );
      });

      this.get('/hotels/verticalFilters', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: [
                {
                  filterId: 'star_ratings',
                  title: 'Star ratings',
                  filters: [
                    {
                      id: '5_star_rating',
                      title: '5 Star',
                    },
                    {
                      id: '4_star_rating',
                      title: '4 Star',
                    },
                    {
                      id: '3_star_rating',
                      title: '3 Star',
                    },
                  ],
                },
                {
                  filterId: 'propety_type',
                  title: 'Property type',
                  filters: [
                    {
                      id: 'prop_type_hotel',
                      title: 'Hotel',
                    },
                    {
                      id: 'prop_type_apartment',
                      title: 'Apartment',
                    },
                    {
                      id: 'prop_type_villa',
                      title: 'Villa',
                    },
                  ],
                },
              ],
            },
          }
        );
      });
    },
  });

  return server;
}
