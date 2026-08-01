const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = 3000;

// Read form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Booking form
app.post("/book", (req, res) => {

    const {

        fullname,
        email,
        phone,
        destination,
        travelDate,
        guests,
        message

    } = req.body;

    db.run(

        `INSERT INTO bookings
        (fullname,email,phone,destination,travelDate,guests,message)
        VALUES (?,?,?,?,?,?,?)`,

        [

            fullname,
            email,
            phone,
            destination,
            travelDate,
            guests,
            message

        ],

        function(err){

            if(err){

                console.log(err);

                return res.send("Booking Failed");

            }

            res.send(`

                <h1>Booking Successful!</h1>

                <h2>Booking Number: DDT-${this.lastID}</h2>

                <p>Thank you ${fullname}.</p>

                <a href="/">Return Home</a>

            `);

        }

    );

});
app.get("/bookings", (req, res) => {

    db.all("SELECT * FROM bookings ORDER BY id DESC", [], (err, rows) => {

        if(err){

            return res.status(500).json({error:err.message});

        }

        res.json(rows);

    });

});
// Admin Login

app.post("/admin-login", (req, res) => {

    const { username, password } = req.body;

    if (
        username === "admin" &&
        password === "12345"
    ) {

        res.redirect("/admin/dashboard.html");

    } else {

        res.send("<h2>Wrong Username or Password</h2>");

    }

});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});