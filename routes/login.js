var express = require('express');
var router = express.Router();
var dotenv = require("dotenv")

// custom modules
const databaseHandler = require("../lib/databaseHandler")// for database


router.get("/",function(req,res,next){
    res.render('login', { title: 'VolunteerMe' })
  })
router.post("/",function(req,res,next){
let user = {Email: req.body.Email,Name: req.body.Name,Password : req.body.Password}
let authenticator = new databaseHandler(user)
authenticator.logIn(function(err,user){
    if(err == "invalid password"){
    console.log(err)
    res.render("Login")
    }
    else if(user != null){
    console.log("successful login")
    // temporarily cause I'll be using passport in the final implementation
    res.render("LandingPage")
    }
    else if(err == "inexistance"){
    console.log("inexisting client")
    res.render("signUp")
    }
    else if(err){
    res.render("signUp")
    }
})
})


module.exports = router;
