CREATE TABLE users(
    id             SERIAL PRIMARY KEY,
    email          VARCHAR(64) NOT NULL,
    password       VARCHAR(64) NOT NULL
);