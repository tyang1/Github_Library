const fetch = require("cross-fetch");

export function signUp(data) {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Content-Type": "text/html",
      },
    })
      .then((res) => res.json())
      .then((data) => resolve(true))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function logIn(data) {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
