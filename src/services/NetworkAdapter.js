class NetworkAdapter {
  async get(endpoint, params = {}) {
    try {
      const url = new URL(endpoint, window.location.origin);

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
      const url = new URL(endpoint, window.location.origin);
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
      const url = new URL(endpoint, window.location.origin);
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
