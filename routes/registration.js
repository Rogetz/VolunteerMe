var express = require('express');
var router = express.Router();
require("dotenv").config()

// custom modules
const mailer = require("../lib/nodemailer")


router.get("/",function(req,res,next){
    res.render("registration",{ title: 'VolunteerMe' })
})

router.post("/",function(req,res,next){
    if(req.body.password != req.body.confirmpassword){
        // find a way of telling the view that the two passwords do not match.
        req.flash("loginResult","passwords do not match")
        res.redirect("/registration")
    }
    // Environment variables can never be arrays.
    else{
        process.env.CURRENT_USER_Email = req.body.email
        process.env.CURRENT_USER_Name =  req.body.username
        process.env.CURRENT_USER_Password = req.body.password
        process.env.CURRENT_USER_FullName = req.body.name
        process.env.CURRENT_USER_Phone = req.body.phone

        console.log("process email "+process.env.CURRENT_USER_Email)
        // send email
        console.log("The process user name is: "+process.env.CURRENT_USER_Name)
        console.log(req.body.email)
        process.env.USER_EMAIL_ADRESS = req.body.email
        process.env.VERIFICATION_PIN = mailer.randomizerInt()
        mailer.sendMail()
        req.flash("loginResult","few steps remaining")
        res.redirect("/otpVerification")    
    }
})
  

module.exports = router;
