router.post("/",function(req,res,next){
    if(req.body.verificationOtp == process.env.VERIFICATION_PIN){
      console.log("OTP verified successfuly")
      console.log("retrievd process user is "+process.env.CURRENT_USER_Email)
      console.log("retrieved email: "+process.env.CURRENT_USER_Email)
      let user = {Email : process.env.CURRENT_USER_Email,Name : process.env.CURRENT_USER_Name, Password: process.env.CURRENT_USER_Password}
      console.log(user.Email)
      let authenticator = new databaseHandler(user)
      authenticator.signUp(function(err,user){
        if(err){
          console.log("invalid signup credentials")
          res.render("OTPVerification")
        }
        else if(user != null){
          console.log("successful signup")
          // temporarily cause I'll be using passport in the final implementation
          res.render("LandingPage")
        }
      })
    }
    else{
      res.render("OTPVerification")
    }
  })
  