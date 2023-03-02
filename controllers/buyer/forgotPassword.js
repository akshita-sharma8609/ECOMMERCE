const db = require("../../methods/dbConnection");
const sendEmail = require("../../methods/sendEmail");

const BuyerForgotPasswordGET = (req, res) => {
  res.render("inputemail", { err: null });
};

const BuyerForgotPasswordPOST = (req, res) => {
  let entered_email = req.body.email;
  console.log("ye mail ayi h ", entered_email)

  let query = `select * from person where email='${entered_email}'`;
  db(query).then(function (result) {
    if (result.length > 0) {
      let token = result[0].mailToken;
      console.log("tokennnn", token);
      console.log(typeof token);
      req.session.useremail = entered_email;

      let subject = "Change Your Password";
      let html = `<h1>Dear user,</h1><br><h3>Change your password by clicking on the below link:</h3><a href="http://localhost:3000/changepassword/${token}">Change Password</a>`;

      sendEmail(entered_email, token, html, subject, function (err, data) {
        if (err) {
          // res.render("changepassword", { err: "something went wrong" });
          res.json({msg:"changepassword"});
          return;
        }

        // res.render("pswrdmessage");
        else res.json({msg:"pswrdmessage"});
      });
    } else {
      // res.render("changepassword", { err: "user does not exits" });
      res.json({msg:"changepassword"})
    }
  });
};

module.exports = {
  BuyerForgotPasswordGET,
  BuyerForgotPasswordPOST,
};
