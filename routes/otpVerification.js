var express = require('express');
var router = express.Router();
require("dotenv").config()

// custom modules
const databaseHandler = require("../lib/databaseHandler")// for database

router.post("/",function(req,res,next){
    if(req.body.verificationOtp == process.env.VERIFICATION_PIN){
      console.log("OTP verified successfuly")
      console.log("retrievd process user is "+process.env.CURRENT_USER_Email)
      console.log("retrieved email: "+process.env.CURRENT_USER_Email)
      let user = {email : process.env.CURRENT_USER_Email,userName : process.env.CURRENT_USER_Name, password: process.env.CURRENT_USER_Password,fullName:process.env.CURRENT_USER_FullName,phone:process.env.CURRENT_USER_Phone}
      console.log(`current email found: ${user.email}`)
      let authenticator = new databaseHandler(user)
      authenticator.signUp(function(err,user){
        if(err){
          console.log("invalid signup credentials")
          req.flash("loginResult","invalid signup credentials")
          res.redirect('/registration')
          //res.render("registration",{ title: 'VolunteerMe' })
        }
        else if(user != null){
          console.log("successful signup")
          req.flash("loginResult","successful signup")
          res.redirect('/index')
          // temporarily cause I'll be using passport in the final implementation
          //res.render("index",{ title: 'VolunteerMe' })
        }
      })
    }
    else{
      console.log('wrong otp pin')
      // tell the user to key in the right OTP
      req.flash("loginResult","wrong otp pin")
      res.redirect("/otpVerification")
    }
  })

router.get("/",function(req,res,next){
  // render method calls the next method automaticlly so you dont need to call it after calling the render method.
  res.render("otpVerification",{ title: 'VolunteerMe' })
})
  

module.exports = router;