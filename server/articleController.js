const dotenv = require("dotenv");

dotenv.config();

function getAllArticles(req, res, next) {
  return (repo) => {
    try {
      repo.getAllArticles().then((articles) => {
        if (!articles.length) {
          return res.status(200).send("There is no article");
        }
        return res.json(articles);
      });
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
}

module.exports = {
  getAllArticles,
};
