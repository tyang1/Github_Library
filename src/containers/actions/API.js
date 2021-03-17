const axios = require('axios').default;

export function signUp(data) {
  axios({
    url: `${process.env.API_URL}/signup`,
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
