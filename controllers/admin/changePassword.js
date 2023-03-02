const db = require("../../methods/dbConnection");
const sendEmail = require("../../methods/sendEmail");

const AdminchangePassowrdGET1 = (req, res) => {
  let email = req.session.useremail;
  if (!email) {
    res.redirect("/adminlogin");

  } else
    res.render("adminchangepassword.ejs", { err: null });
};

const AdminchangePassowrdGET2 = function (req, res) {
  let { token } = req.params;
  let query = `select * from person where mailToken = '${token}'`;
  db(query).then(function (user) {
    req.session.useremail = user[0].email;
    res.redirect("/adminchangepassword",{err:null});
  });
};

const AdminchangePasswordPOST = (req, res) => {
  let new_password = req.body.newpassword;
  let confirm_password = req.body.confirmpassword;

  //check that the password length is greater than or equal to 8
  if (new_password.length < 8 || confirm_password.length < 8) {
    // res.render("adminchangepassword", {
    //   err: "Use a strong password of atleast 8 characters",
    // });
    res.json({ msg: "adminchangepassword" });
    return;
  }

  //re-rendering the chnage password page if the new and confirmed password are not matching
  if (new_password !== confirm_password) {
    // res.render("adminchangepassword", {
    //   err: "confirmed password is not matching with new password",
    // });

    res.json({ msg: "adminchangepassword" });
  } else {
    let query = `select * from person where email='${req.session.useremail}'`;
    db(query)
      .then(function (result) {
        if (result.length > 0) {
          return result;
        }
      })
      .then(function (result) {
        query = `update person set password='${new_password}' where email='${req.session.useremail}'`;
        db(query).then(function () {
          let html = `<h2>Dear user, <br>Your password is successfully updated<h2>`;
          let Subject = "Password Change";

          //sending mail to inform the user about the successful change of password
          sendEmail(
            req.session.useremail,
            null,
            html,
            Subject,
            function (err, d) {
              // console.log(d);
              if (err) {
                // res.render("changepassword", { err: "something went wrong" });

                res.json({ msg: "adminchangepassword" });
              } else {
                // res.render("home", {
                //   user_role: result[0].role,
                // });

                res.json({ msg: "done" });
              }
            }
          );
        });
      });
  }
};

module.exports = {
  AdminchangePassowrdGET1,
  AdminchangePassowrdGET2,
  AdminchangePasswordPOST,
};
