const axios = require('axios').default;

export function signIn(data) {
  axios({
    url: `${process.env.API_URL}/login`,
    method: 'post',
    data,
  }).then((response) => {
    console.log('get the token', response);
    // saveToLocalStorage(response);
  });
}

// async function saveToLocalStorage(res) {
//   const token = await res.json();
//   localStorage.setItem('token', token);
// }
