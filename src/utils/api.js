import defaultData from './defaultData';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _getDataFromServer() {
    const url = `${this._baseUrl}/api/users`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Can't get data from server");
    const data = await res.json();
    return data;
  }

  _getDefaultData() {
    return defaultData;
  }

  async getData() {
    try {
      return await this._getDataFromServer();
    } catch (err) {
      console.warn('Server is offline. Using default data');
      return this._getDefaultData();
    }
  }
}

const api = new Api({ baseUrl: 'http://localhost:8080' });

export default api;
