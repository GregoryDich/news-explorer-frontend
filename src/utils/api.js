const BASE_URL =
  'https://api.news-explorer-gregory.students.nomoredomainssbs.ru';
function checkResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
function generateHeaders() {
  const jwt = localStorage.getItem('jwt');
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };
}
export const register = ({ email, password, username }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name: username }),
  });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: generateHeaders(),
  }).then(checkResponce);
};
export const getCurrentUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: generateHeaders(),
  }).then(checkResponce);
};
export const getArticles = () => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: generateHeaders(),
  }).then(checkResponce);
};
export const saveArticle = (keyword, card) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify({
      keyword,
      title: card.data.title,
      text: card.data.description,
      date: card.data.publishedAt,
      source: card.data.source.name,
      image: card.data.urlToImage,
      link: card.data.url,
    }),
  }).then(checkResponce);
};
export const deleteArticle = (id) => {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: generateHeaders(),
  }).then(checkResponce);
};
