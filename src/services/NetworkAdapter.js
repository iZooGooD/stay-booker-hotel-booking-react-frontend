class NetworkAdapter {
  async get(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return await response.json();
    } catch (error) {
      return {
        data: {},
        errors: [error],
      };
    }
  }
}

export const networkAdapter = new NetworkAdapter();
