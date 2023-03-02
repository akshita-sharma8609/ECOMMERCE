const db = require("../../methods/dbConnection");
const sendEmail = require("../../methods/sendEmail");

const AdminForgotPasswordGET = (req, res) => {
  res.render("admininputemail", { err: null });
};

const AdminForgotPasswordPOST = (req, res) => {
  let entered_email = req.body.email;

  let query = `select * from person where email='${entered_email}'`;
  db(query).then(function (result) {
    if (result.length > 0) {
      let token = result[0].mailToken;
      console.log("tokennnn", token);
      console.log(typeof token);
      req.session.useremail = entered_email;

      let subject = "Change Your Password";
      let html = `<h1>Dear Seller,</h1><br><h3>Change your password by clicking on the below link:</h3><a href="http://localhost:3000/adminchangepassword/${token}">Change Password</a>`;

      sendEmail(entered_email, token, html, subject, function (err, data) {
        if (err) {
          res.render("adminchangepassword", { err: "something went wrong" });
          return;
        }

        res.render("pswrdmessage");
      });
    } else {
      res.render("adminchangepassword", { err: "user does not exits" });
    }
  });
};

module.exports = {
  AdminForgotPasswordGET,
  AdminForgotPasswordPOST,
};
