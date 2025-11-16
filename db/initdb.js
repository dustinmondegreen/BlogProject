import Database from "better-sqlite3";

const db = new Database('app.db');

const query = `
    CREATE TABLE IF NOT EXISTS users (
        userID INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        creationDate TEXT,
        UNIQUE(email, username),
        CHECK(length(username) BETWEEN 3 AND 32, length(email) <= 254)
    );

    CREATE TABLE IF NOT EXISTS blogs (
        blogID INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL, 
        publishDate TEXT,
        userID INTEGER,
        FOREIGN KEY (userID) REFERENCES users (userID)
            ON UPDATE NO ACTION
            ON DELETE SET NULL
    );
`;

export default function (){
    db.exec(query)
};