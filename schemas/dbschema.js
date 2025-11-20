const query = `
    CREATE TABLE IF NOT EXISTS users (
        userID INTEGER PRIMARY KEY,
        email TEXT NOT NULL UNIQUE CHECK(LENGTH(email) <= 255),
        username TEXT NOT NULL UNIQUE CHECK(LENGTH(username) BETWEEN 3 AND 32),
        password_hash TEXT NOT NULL,
        creationDate TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blogs (
        blogID INTEGER PRIMARY KEY,
        title TEXT NOT NULL CHECK(LENGTH(title) <= 255),
        body TEXT NOT NULL, 
        publishDate TEXT DEFAULT (datetime('now')),
        userID INTEGER,
        FOREIGN KEY (userID) REFERENCES users (userID)
            ON UPDATE NO ACTION
            ON DELETE SET NULL
    );
`;

export default query;