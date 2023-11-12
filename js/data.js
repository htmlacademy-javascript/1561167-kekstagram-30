const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Method = { GET: 'GET', POST: 'POST' };
const Route = {
  [Method.GET]: '/data',
  [Method.POST]: '/',
};

const request = (
  route,
  cbSuccess,
  cbFailure,
  method = Method.GET,
  body = null
) =>
  fetch(route, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => cbSuccess(data))
    .catch((err) => cbFailure(err));

const getData = (cbSuccess, cbFailure) =>
  request(`${BASE_URL}${Route[Method.GET]}`, cbSuccess, cbFailure);

const sendData = (cbSuccess, cbFailure, data) =>
  request(
    `${BASE_URL}${Route[Method.POST]}`,
    cbSuccess,
    cbFailure,
    Method.POST,
    data
  );

export { getData, sendData };
