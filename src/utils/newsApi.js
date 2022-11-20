class NewsApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  getArticles(keyword) {
    return fetch(
      `${
        this._baseUrl
      }?q=${keyword}&from=${this._setSubstractedDate()}&to=${this._setCurrentDate()}&pageSize=100&apiKey=7f0d35d091e145a6a1502ce5ffe2668c`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(this._checkResponce);
  }
  _checkResponce = (res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

  _setCurrentDate() {
    return new Date().toJSON().slice(0, 10);
  }
  _setSubstractedDate() {
    const date = new Date();
    return new Date(date.setDate(date.getDate() - 7)).toJSON().slice(0, 10);
  }
}
const newsApi = new NewsApi({
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
});
export default newsApi;
