const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {

    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }

});

db.serialize(() => {

    db.run(`

        CREATE TABLE IF NOT EXISTS bookings (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            fullname TEXT,

            email TEXT,

            phone TEXT,

            destination TEXT,

            travelDate TEXT,

            guests INTEGER,

            message TEXT,

            bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP

        )

    `);
db.run(`

CREATE TABLE IF NOT EXISTS admins(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT

)

`);
});

module.exports = db;