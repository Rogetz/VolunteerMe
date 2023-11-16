var express = require('express');
var router = express.Router();

// custom modules
const databaseHandler = require("../lib/databaseHandler")// for database

router.post("/",function(req,res,next){
    databaseHandler.updatePassword(req.body.Email,req.body.Password,function(err,message){
      if(err){
        console.log(err)
        req.flash("loginResult","error changing password")
        res.redirect("/login")
      }
      else{
        console.log("succesful password change")
        req.flash("loginResult","succesful password change")
        res.redirect("/login")
        //res.render("Login")
      }
    })
})  

module.exports = router;
