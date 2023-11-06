var express = require('express');
var router = express.Router();
var dotenv = require("dotenv")

// custom modules
const databaseHandler = require("../lib/databaseHandler")// for database

router.post("/",function(req,res,next){
    databaseHandler.updatePassword(req.body.Email,req.body.Password,function(err,message){
      if(err){
        console.log(err)
        res.render("Login")
      }
      else{
        console.log("succesful password change")
        res.render("Login")
      }
    })
})  

module.exports = router;
