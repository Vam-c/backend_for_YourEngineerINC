const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//creating USERDB to store the data
mongoose.connect("mongodb://localhost:27017/USERDB",{useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    dob:  Date
});

const User = new mongoose.model("User", userSchema);

//POST method for /register route.
app.post("/register", function(req, res){
    // send the following data with appropriate name when posting.
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // enter dob as yyyy-mm-dd(BSON model).
    const dob = new Date(req.body.dob);
    console.log("Age is: ", 2022 - dob.getFullYear());
});

app.listen(8080, function(){
    console.log("Server running on port 8080");
});
