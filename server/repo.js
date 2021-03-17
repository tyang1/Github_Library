const repository = (db) => {
  //if the connection is there:
  //return the db interfaces
  const saveUser = (userInfo) => {
    return new Promise((resolve, reject) => {
      const { email, password } = userInfo;
      db.query(
        'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id',
        [email, password],
        async (error, response) => {
          if (error) reject(error);
          resolve(response);
        }
      );
    });
  };

  const getUser = (userInfo) => {
    return new Promise((resolve, reject) => {});
  };

  return Object.create({
    saveUser,
    getUser,
  });
};

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(repository(connection));
  });
};

module.exports = Object.assign({}, { connect });
