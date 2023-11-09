const nodemailer = require("nodemailer")
require("dotenv").config()

console.log(process.env.EMAIL_ADDRESS)

exports.randomizerInt = function randomizerInt(){
  let generatedNumber = Math.ceil(Math.random() * 1000) + 1000
  return(generatedNumber)
}

exports.sendMail = function(){
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      host : "smtp.gmail.com", 
      secure : true,
      auth : {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD
      }
  });

  mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.USER_EMAIL_ADRESS,
      subject:"Enter this verification code to sign up "+process.env.VERIFICATION_PIN,
      //html:     "<div style='margin: auto;display: flex;flex-direction: column;text-align: center;width: 20rem;height: 18rem;color: blue;background-color: rgba(0,0,255,0.2);border-radius: 1rem;'><div>This is a verification email response<br>It needs no response<br>Enter the verification pin in the title to verify your identity in our app</div><p> hOPING TO SEE YOY SOON</p></div>"
  };  
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        console.log("He should check his email for veriification")
      }
    });
}