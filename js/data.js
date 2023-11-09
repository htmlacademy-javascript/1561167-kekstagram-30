const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  LOAD: '/data',
  UPLOAD: '/',
};
const Method = { GET: 'GET', POST: 'POST' };

const load = (route, errorMessage, method = Method.GET, body = null) =>
  fetch(route, { method, body }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

const getData = (onSuccess, onFailure) => {
  const url = `${BASE_URL}${Route.LOAD}`;
  load(url, '')
    .then((data) => onSuccess(data))
    .catch((err) => onFailure(err));
};

const sendData = (onSuccess, onFailure, body) => {
  const url = `${BASE_URL}${Route.UPLOAD}`;
  load(url, '', Method.POST, body)
    .then((data) => onSuccess(data))
    .catch((err) => onFailure(err));
};

export { getData, sendData };
