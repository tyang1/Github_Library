CREATE TABLE article(
    id               SERIAL PRIMARY KEY,
    category         VARCHAR(64),
    article          VARCHAR(64) NOT NULL,
    link             VARCHAR(64),
    notes            VARCHAR(64)
);