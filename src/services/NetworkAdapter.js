class NetworkAdapter {
  API_CONFIG = {
    MIRAGE: window.location.origin,
    EXPRESS: 'http://localhost:4000',
  };
  API_URL = this.API_CONFIG.MIRAGE;
  async get(endpoint, params = {}) {
    console.log('API_URL', this.API_URL);
    const endpointURL = new URL(endpoint, this.API_URL);
    try {
      const url = new URL(endpointURL, window.location.origin);

      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const response = await fetch(url.toString(), { credentials: 'include' });
      return await response.json();
    } catch (error) {
      console.error(error);
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  async post(endpoint, data = {}) {
    try {
      const endpointURL = new URL(endpoint, this.API_URL);
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
      console.error(error);
      return {
        data: {},
        errors: [error.message],
      };
    }
  }

  async put(endpoint, data = {}) {
    try {
      const endpointURL = new URL(endpoint, this.API_URL);
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
      console.error(error);
      return {
        data: {},
        errors: [error.message],
      };
    }
  }
}

export const networkAdapter = new NetworkAdapter();
