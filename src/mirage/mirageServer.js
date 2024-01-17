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
