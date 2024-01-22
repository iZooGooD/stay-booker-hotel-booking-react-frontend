class NetworkAdapter {
  async get(endpoint, params = {}) {
    try {
      const url = new URL(endpoint, window.location.origin);

      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return {
        data: {},
        errors: [error.message], // Store error message instead of error object
      };
    }
  }
}

export const networkAdapter = new NetworkAdapter();
