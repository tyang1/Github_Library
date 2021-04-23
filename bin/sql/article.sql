CREATE TABLE article(
    id               SERIAL PRIMARY KEY,
    category         TEXT,
    article          TEXT NOT NULL,
    link             TEXT,
    notes            TEXT
);