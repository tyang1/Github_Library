const axios = require('axios').default;

export function signIn(data) {
  axios({
    url: `${process.env.API_URL}/login`,
    method: 'post',
    data,
  }).then((response) => {
    console.log('get the token', response);
  });
}

function saveToLocalStorage() {}
