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
          resolve(response.rows[0]);
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
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM article", (error, response) => {
        if (error) reject(error);
        resolve(response.rows);
      });
    });
  };

  return Object.create({
    saveUser,
    getPwdHash,
    getAllArticles,
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
