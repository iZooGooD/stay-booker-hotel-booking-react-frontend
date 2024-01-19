import { createServer, Model, Response } from 'miragejs';

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

      this.get('/hotests', (request) => {
        if (request.queryParams.city === 'mumbai') {
          return new Response(
            200,
            {},
            {
              errors: [],
              data: {
                elements: [
                  {
                    path: '/nearbyHotels',
                    response: {
                      statusCode: 200,
                      headers: {},
                      body: {
                        errors: [],
                        data: {
                          elements: [
                            {
                              hotelCode: 81331,
                              image: {
                                imageUrl:
                                  '/images/hotels/348592039/348592039.jpg',
                                accessibleText: 'Taj Mahal Palace Mumbai',
                              },
                              title: 'The Taj Mahal Palace, Mumbai',
                              subtitle:
                                'Apollo Bunder, Mumbai | 2.5 kms from city center',
                              benefits: [
                                'Free cancellation',
                                'Pay later option available',
                                'Free breakfast',
                              ],
                              price: '35,000',
                              ratings: '9.2',
                              city: 'mumbai',
                            },
                            {
                              hotelCode: 81332,
                              image: {
                                imageUrl:
                                  '/images/hotels/500213112/500213112.jpg',
                                accessibleText: 'Oberoi Mumbai',
                              },
                              title: 'The Oberoi Mumbai',
                              subtitle:
                                'Nariman Point, Mumbai | 3 kms from city center',
                              benefits: [
                                'Ocean view rooms',
                                'Free wifi',
                                'Spa services',
                              ],
                              price: '30,750',
                              ratings: '9.5',
                              city: 'mumbai',
                            },
                            {
                              hotelCode: 81333,
                              image: {
                                imageUrl:
                                  '/images/hotels/114422003/114422003.jpg',
                                accessibleText: 'Trident Bandra Kurla Mumbai',
                              },
                              title: 'Trident Bandra Kurla',
                              subtitle:
                                'Bandra Kurla Complex, Mumbai | 8 kms from city center',
                              benefits: [
                                'Free cancellation',
                                'Fitness center',
                                'Business facilities',
                              ],
                              price: '27,999',
                              ratings: '8.9',
                              city: 'mumbai',
                            },
                            {
                              hotelCode: 81334,
                              image: {
                                imageUrl:
                                  '/images/hotels/324668211/324668211.jpg',
                                accessibleText: 'Four Seasons Mumbai',
                              },
                              title: 'Four Seasons Hotel Mumbai',
                              subtitle:
                                'Worli, Mumbai | 4.1 kms from city center',
                              benefits: [
                                'Rooftop bar',
                                'Infinity pool',
                                'Spa and wellness center',
                              ],
                              price: '28,500',
                              ratings: '8.7',
                              city: 'mumbai',
                            },
                            {
                              hotelCode: 81335,
                              image: {
                                imageUrl:
                                  '/images/hotels/678321044/678321044.jpg',
                                accessibleText: 'St. Regis Mumbai',
                              },
                              title: 'The St. Regis Mumbai',
                              subtitle:
                                'Lower Parel, Mumbai | 3.8 kms from city center',
                              benefits: [
                                'Butler service',
                                'Exclusive club lounge',
                                'Luxury spa',
                              ],
                              price: '33,200',
                              ratings: '9.1',
                              city: 'mumbai',
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            }
          );
        }
      });
    },
  });

  return server;
}
