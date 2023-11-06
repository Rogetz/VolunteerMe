var express = require('express');
var router = express.Router();
var dotenv = require("dotenv")

// custom modules
const databaseHandler = require("../lib/databaseHandler")// for database


router.get("/",function(req,res,next){
    res.render("registration",{ title: 'VolunteerMe' })
})

router.post("/",function(req,res,next){
    // Environment variables can never be arrays.
    process.env.CURRENT_USER_Email = req.body.Email
    process.env.CURRENT_USER_Name =  req.body.Name
    process.env.CURRENT_USER_Password = req.body.Password
    console.log("process email "+process.env.CURRENT_USER_Email)
    // send email
    console.log("The process user is: "+process.env.CURRENT_USER)
    console.log(req.body.Email)
    process.env.USER_EMAIL_ADRESS = req.body.Email
    process.env.VERIFICATION_PIN = mailer.randomizerInt()
    mailer.sendMail()
    res.render("OTPVerification")
})
  

module.exports = router;
