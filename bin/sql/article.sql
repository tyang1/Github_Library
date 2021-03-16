CREATE TABLE article(
    id               SERIAL PRIMARY KEY,
    category         VARCHAR(64),
    article          VARCHAR(64) NOT NULL,
    github           VARCHAR(64)
);