var express = require('express');
var router = express.Router();
require("dotenv").config()

// custom modules
const databaseHandler = require("../lib/databaseHandler")// for database


router.get("/",function(req,res,next){
    res.render('login', { title: 'VolunteerMe' })
    next()
  })
router.post("/",function(req,res,next){
let user = {userName: req.body.username,password : req.body.password}
let authenticator = new databaseHandler(user)
authenticator.logIn(function(err,user){
    if(err == "invalid password"){
    console.log(err)
    req.flash("loginResult",err)
    res.redirect('/login')
    //res.render('login', { title: 'VolunteerMe' })
    }
    else if(user != null){
    console.log("successful login")
    req.flash("loginResult","successful login")
    // temporarily cause I'll be using passport in the final implementation
    res.redirect('/index')
    //res.render('index', { title: 'VolunteerMe' })
    }
    else if(err == "inexistance"){
    console.log("inexisting client")
    req.flash("loginResult",err)
    res.redirect('/registration')
    //res.render('registration', { title: 'VolunteerMe' })
    }
    else if(err){
    req.flash("loginResult",err)
    res.redirect('/registration')
    //res.render('registration', { title: 'VolunteerMe' })
    }
})
next()
})


module.exports = router;
