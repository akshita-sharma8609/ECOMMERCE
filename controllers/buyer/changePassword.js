const db = require("../../methods/dbConnection");
const sendEmail = require("../../methods/sendEmail");

const BuyerchangePassowrdGET1 = (req, res) => {
  let email = req.session.useremail;
  if (!email) {
    res.redirect("/login");

  } else res.render("changepassword.ejs", { err: null });
};

const BuyerchangePassowrdGET2 = function (req, res) {
  let { token } = req.params;
  let query = `select * from person where mailToken = '${token}'`;
  db(query).then(function (user) {
    // res.redirect("/changepassword");
    req.session.useremail = user[0].email;
    res.render("changepassword", {err:null});
  });
};

const BuyerchangePasswordPOST = (req, res) => {

  let new_password = req.body.newpassword;
  let confirm_password = req.body.confirmpassword;

  //check that the password length is greater than or equal to 8
  if (new_password.length < 8 || confirm_password.length < 8) {
    // res.render("changepassword", {
    //   err: "Use a strong password of atleast 8 characters",
    // });
    res.json({msg:"changepassword"})
    return;
  }

  //re-rendering the chnage password page if the new and confirmed password are not matching
  if (new_password !== confirm_password) {
    // res.render("changepassword", {
    //   err: "confirmed password is not matching with new password",
    // });
    res.json({msg:"changepassword"})
  } else {
    //if the new and confirmed password matched then change the password and
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
          console.log(req.session.useremail)
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
                res.json({msg:"changepassword"})
              } else {

                // res.render("home", {
                //   user_role: result[0].role,
                // });
                res.json({msg:"done"})
              }
            }
          );
        });
      });
  }
};

module.exports = {
  BuyerchangePassowrdGET1,
  BuyerchangePassowrdGET2,
  BuyerchangePasswordPOST,
};
