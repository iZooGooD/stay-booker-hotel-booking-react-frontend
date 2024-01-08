import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/user', ({ request }) => {
    return HttpResponse.json({ name: 'John' });
  }),
];
