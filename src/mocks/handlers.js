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
];
