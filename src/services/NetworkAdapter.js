// Usage: import { networkAdapter } from 'path/to/NetworkAdapter.js';
// Usage: const response = await networkAdapter.get('/api/hotel/123');
// Usage: const response = await networkAdapter.post('/api/hotel', { name: 'Hotel Name' });
class NetworkAdapter {
  static #API_CONFIG = {
    MIRAGE: window.location.origin,
    EXPRESS: 'http://localhost:4000',
  };
  static #API_URL = NetworkAdapter.#API_CONFIG.MIRAGE;
  async get(endpoint, params = {}) {
    const endpointURL = new URL(endpoint, NetworkAdapter.#API_URL);
    try {
      const url = new URL(endpointURL, window.location.origin);

      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const response = await fetch(url.toString(), { credentials: 'include' });
      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  async post(endpoint, data = {}) {
    try {
      const endpointURL = new URL(endpoint, NetworkAdapter.#API_URL);
      const url = new URL(endpointURL, window.location.origin);
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  async put(endpoint, data = {}) {
    try {
      const endpointURL = new URL(endpoint, NetworkAdapter.#API_URL);
      const url = new URL(endpointURL, window.location.origin);
      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  async delete(endpoint) {
    try {
      const endpointURL = new URL(endpoint, NetworkAdapter.#API_URL);
      const url = new URL(endpointURL, window.location.origin);
      const response = await fetch(url.toString(), {
        method: 'DELETE',
        credentials: 'include',
      });

      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  async patch(endpoint, data = {}) {
    try {
      const endpointURL = new URL(endpoint, NetworkAdapter.#API_URL);
      const url = new URL(endpointURL, window.location.origin);
      const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error.message],
      };
    }
  }
}

export const networkAdapter = new NetworkAdapter();
