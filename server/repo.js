const repository = (db) => {
  //if the connection is there:
  //return the db interfaces
  const saveUser = (userInfo) => {
    return new Promise((resolve, reject) => {
      const { email, hash } = userInfo;
      db.query(
        "INSERT INTO users(email, password) VALUES($1, $2) RETURNING id",
        [email, hash],
        (error, response) => {
          if (error) reject(error);
          resolve(response);
        }
      );
    });
  };

  const getPwdHash = (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        (error, response) => {
          if (error) reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  };

  const getAllArticles = () => {
    //TODO: refactors logic to collect articleIds and get articles
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM article", (error, response) => {
        if (error) reject(error);
        resolve(response.rows);
      });
    });
  };

  const addArticle = async (userId, articleInfo) => {
    const insertArticle = (articleInfo) =>
      new Promise((resolve, reject) => {
        const { category, article, link, notes } = articleInfo;
        db.query(
          "INSERT INTO article(category, article, link, notes) VALUES($1, $2, $3, $4) RETURNING id",
          [category, article, link, notes],
          (error, response) => {
            if (error) reject(error);
            resolve(response.rows[0].id);
          }
        );
      });

    const insertUserArticle = (articleId) =>
      new Promise((resolve, reject) => {
        db.query(
          'INSERT INTO userarticle("userId", "articleId") VALUES($1, $2) RETURNING "articleId"',
          [userId, articleId],
          (error, response) => {
            if (error) reject(error);
            resolve(response.rows[0].articleId);
          }
        );
      });

    const getArticle_ArticleId = (articleId) =>
      new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM article WHERE article.id = $1",
          [articleId],
          (error, response) => {
            if (error) reject(error);
            resolve(response.rows[0]);
          }
        );
      });

    let newArticleId;
    try {
      newArticleId = await insertArticle(articleInfo);
      newArticleId = await insertUserArticle(newArticleId);
    } catch (e) {
      throw new Error(e);
    }
    return await getArticle_ArticleId(newArticleId);
  };

  return Object.create({
    saveUser,
    getPwdHash,
    getAllArticles,
    addArticle,
  });
};

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("connection db not supplied!"));
    }
    resolve(repository(connection));
  });
};

module.exports = Object.assign({}, { connect });
