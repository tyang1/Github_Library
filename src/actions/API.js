const axios = require('axios').default;

export function signUp(data) {
  axios({
    url: `${process.env.API_URL}/signup`,
    method: 'post',
    data,
  }).then(async (response) => {
    await saveToLocalStorage(response.data);
  });
}

export function logIn(data) {
  axios({
    url: `${process.env.API_URL}/login`,
    method: 'post',
    data,
  }).then(async (response) => {
    await saveToLocalStorage(response.data);
  });
}

async function saveToLocalStorage(token) {
  localStorage.setItem('token', token);
}
