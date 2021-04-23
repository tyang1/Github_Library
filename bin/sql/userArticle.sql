CREATE TABLE userarticle(
    id                          SERIAL PRIMARY KEY,
    "userId"                    INTEGER,
    "articleId"                 INTEGER,
    FOREIGN KEY ("userId")      REFERENCES users(id),
    FOREIGN KEY ("articleId")   REFERENCES article(id)
);