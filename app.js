const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//creating regDB to store the data
mongoose.connect("mongodb://localhost:27017/regDB",{useNewUrlParser: true});

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
    if(2022 - dob.getFullYear() <= 14){
        res.send("Age should be above 14 years!");
    } else {
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            dob: dob
        });
        newUser.save(function(err){
            if(err){
                res.send("Error while saving: " + err);
            } else {
                res.send("User has been registered successfully");
            }
        });
    }
});

//GET method for fetching user data.
app.get("/userData", function(req, res){
    User.find({},function(err, foundUsers){
        if(err){
            res.send(err);
        } else {
            if(foundUsers){
                res.send(foundUsers);
            } else {
                res.send("No users found");
            }
        }
    });
});

app.listen(8080, function(){
    console.log("Server running on port 8080");
});
