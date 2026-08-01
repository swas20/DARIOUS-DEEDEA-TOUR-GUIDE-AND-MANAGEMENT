const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const db = new sqlite3.Database("./database.db");

const username = "admin";
const password = "Admin@2026";

bcrypt.hash(password,10,(err,hash)=>{

    db.run(

        "INSERT INTO admins(username,password) VALUES(?,?)",

        [username,hash],

        function(err){

            if(err){

                console.log(err.message);

            }else{

                console.log("Admin Created Successfully");

            }

            db.close();

        }

    );

});