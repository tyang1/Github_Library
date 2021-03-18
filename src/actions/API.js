const axios = require('axios').default;

export function signUp(data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.API_URL}/signup`,
      method: 'post',
      data,
    })
      .then(async (response) => {
        await saveToLocalStorage(response.data);
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function logIn(data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.API_URL}/login`,
      method: 'post',
      data,
    })
      .then(async (response) => {
        await saveToLocalStorage(response.data);
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

async function saveToLocalStorage(token) {
  localStorage.setItem('token', token);
}
