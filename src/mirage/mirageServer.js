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
      server.create('user', {
        id: '1',
        email: 'user1@example.com',
        password: 'password1',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        phone: '1234567890',
        country: 'USA',
        isPhoneVerified: true,
        isEmailVerified: true,
      });
      server.create('user', {
        id: '2',
        email: 'user2@example.com',
        password: 'password2',
        firstName: 'Jane',
        lastName: 'Doe',
        fullName: 'Jane Doe',
        phone: '0987654321',
        country: 'UK',
        isPhoneVerified: false,
        isEmailVerified: true,
      });
    },

    routes() {
      this.namespace = 'api';

      // Add a logged-in user state to the server
      let loggedInUser = null;

      this.passthrough('http://localhost:4000/*');

      this.get('/user', () => {
        return new Response(200, {}, { name: 'John' });
      });

      this.get('/authUser', () => {
        if (loggedInUser) {
          return new Response(
            200,
            {},
            {
              errors: [],
              data: {
                isAuthenticated: true,
                userDetails: {
                  id: loggedInUser.id,
                  firstName: loggedInUser.firstName,
                  lastName: loggedInUser.lastName,
                  fullName: loggedInUser.fullName,
                  email: loggedInUser.email,
                  phone: loggedInUser.phone,
                  country: loggedInUser.country,
                  isPhoneVerified: loggedInUser.isPhoneVerified,
                  isEmailVerified: loggedInUser.isEmailVerified,
                },
              },
            }
          );
        } else {
          return new Response(
            200,
            {},
            {
              errors: [],
              data: {
                isAuthenticated: false,
                userDetails: {},
              },
            }
          );
        }
      });

      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email: attrs.email });

        if (user && user.password === attrs.password) {
          loggedInUser = user;
          return new Response(
            200,
            {},
            {
              data: {
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBKb2huIiwiaWQiOjEsImlhdCI6MTcwNzU0NTQ5MSwiZXhwIjoxNzA3NTQ5MDkxfQ.dxweIMZGiCuiViov1EfLtu3UwanUMp7TjL85hMDW4rc',
              },
              errors: [],
            }
          );
        } else {
          return new Response(
            404,
            {},
            {
              errors: ['User not found or invalid credentials'],
              data: {},
            }
          );
        }
      });

      this.post('/logout', (_schema, _request) => {
        loggedInUser = null;
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              status: 'User logged out',
            },
          }
        );
      });

      this.post('/register', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const existingUser = schema.users.findBy({ email: attrs.email });

        if (existingUser) {
          return new Response(
            409,
            {},
            { error: 'User already exists with that email' }
          );
        } else {
          // Create a new user
          const newUser = schema.users.create({
            firstName: attrs.firstName,
            lastName: attrs.lastName,
            email: attrs.email,
            phone: attrs.phone,
            password: attrs.password,
          });
          return new Response(200, {}, { user: newUser.attrs });
        }
      });

      this.get('/bookings', () => {
        return new Response(
          200,
          {},
          {
            errors: [],
            data: {
              elements: [
                {
                  bookingId: 'BKG123',
                  bookingDate: '2024-01-10',
                  hotelName: 'Seaside Resort',
                  checkInDate: '2024-01-20',
                  checkOutDate: '2024-01-25',
                  totalFare: '₹14,500',
                },
                {
                  bookingId: 'BKG124',
                  bookingDate: '2024-01-03',
                  hotelName: 'Mountain Retreat',
                  checkInDate: '2024-02-15',
                  checkOutDate: '2024-02-20',
                  totalFare: '₹5,890',
                },
                {
                  bookingId: 'BKG125',
                  bookingDate: '2024-01-11',
                  hotelName: 'City Central Hotel',
                  checkInDate: '2024-03-01',
                  checkOutDate: '2024-03-05',
                  totalFare: '₹21,700',
                },
              ],
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

      this.get('/hotel/:hotelId', (_schema, request) => {
        let hotelId = request.params.hotelId;
        const description = [
          'A serene stay awaits at our plush hotel, offering a blend of luxury and comfort with top-notch amenities.',
          'Experience the pinnacle of elegance in our beautifully designed rooms with stunning cityscape views.',
          'Indulge in gastronomic delights at our in-house restaurants, featuring local and international cuisines.',
          'Unwind in our state-of-the-art spa and wellness center, a perfect retreat for the senses.',
          'Located in the heart of the city, our hotel is the ideal base for both leisure and business travelers.',
        ];

        const result = hotelsData.find((hotel) => {
          return Number(hotel.hotelCode) === Number(hotelId);
        });

        result.description = description;
        result.discount = '10%';

        return new Response(
          200,
          {},
          {
            errors: [],
            data: result,
          }
        );
      });

      this.get('/hotels', (_schema, request) => {
        const filters = request.queryParams.filters;
        const parsedFilters = JSON.parse(filters);
        const city = parsedFilters.city;
        const star_ratings = parsedFilters.star_ratings;

        const filteredResults = hotelsData.filter((hotel) => {
          const hotelRating = parseFloat(hotel.ratings);
          const isCityMatch = city === '' || hotel.city === city;
          if (isCityMatch) {
            if (star_ratings && star_ratings.length > 0) {
              return star_ratings.some((selectedRating) => {
                const selected = parseFloat(selectedRating);
                const range = 0.5;
                return Math.abs(hotelRating - selected) <= range;
              });
            } else {
              // If no star ratings are provided, return all hotels for the city (or all cities if city is empty)
              return true;
            }
          }
          return false;
        });

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
                      value: '5',
                    },
                    {
                      id: '4_star_rating',
                      title: '4 Star',
                      value: '4',
                    },
                    {
                      id: '3_star_rating',
                      title: '3 Star',
                      value: '3',
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
