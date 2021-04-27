const fetch = require("cross-fetch");

export default {
  signUp: (data) => {
    console.log("inside API signUp");
    return new Promise((resolve, reject) => {
      fetch(`${process.env.API_URL}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  logIn: (data) => {
    console.log("inside API logIn");
    return new Promise((resolve, reject) => {
      // console.log("logIn path", process.env);
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
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  addArticle: (userId, article) => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.API_URL}/server/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ article: article, userId: userId }),
      })
        .then((article) => {
          resolve(article);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getAllArticles: () => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.API_URL}/server/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
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
  },
};
