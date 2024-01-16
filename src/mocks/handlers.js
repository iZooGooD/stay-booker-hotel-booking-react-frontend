import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/user', ({ request }) => {
    return HttpResponse.json({ name: 'John' });
  }),
  http.get('/authUser', ({ request }) => {
    return HttpResponse.json({
      errors: [],
      data: {
        isAuthenticated: true,
        userId: '23122',
      },
    });
  }),
  http.get('/popularDestinations', ({ request }) => {
    return HttpResponse.json({
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
    });
  }),
];
