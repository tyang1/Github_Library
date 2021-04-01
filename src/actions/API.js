const fetch = require("cross-fetch");

export function signUp(data) {
  return new Promise((resolve, reject) => {
    fetch(`/signup`, {
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
    fetch(`/login`, {
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

export function addArticle(article) {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(article),
    })
      .then((article) => {
        resolve(article);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllArticles() {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Content-Type": "text/html",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((articles) => {
        resolve(articles);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
