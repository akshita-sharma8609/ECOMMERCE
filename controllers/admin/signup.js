const path = require("path");
const db = require("../../methods/dbConnection");
const sendEmail = require("../../methods/sendEmail");

const AdminSignupGET = function (req, res) {
  res.sendFile(path.resolve(__dirname + "/../../admin/adminsignup.html"));
};

const AdminSignupPOST = (req, res) => {
  //extracting the already exits data from data.txt file

  let req_email = req.body.email;
  let query = `select COUNT(email) as count_email from person where email='${req_email}'`;

  db(query)
    .then(function (val) {
      if (val[0].count_email != 0)
        // res.render("adminsignup", {
        //   err: "User already exits. Please change the signup details",
        // });
        res.json({msg:"adminsignup"});
      else {
        if (req.body.password.length < 8) {
          // res.render("signup", {
          //   err: "Please use strong password of atleast 8 characters ",
          // });
          
        res.json({msg:"adminsignup"});
        return;
        }
        // else if (signup_flag) {

        let obj = {
          // username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          is_verified: 0,
          role: 2,
          mailToken: Date.now(),
          address: req.body.address,
        };
        // console.log(obj);
        //insert data into db
        query = `insert into person(email, password, isverified, mailToken, role) values('${obj.email}', '${obj.password}', '${obj.is_verified}', '${obj.mailToken}', '${obj.role}')`;

        db(query).then(function () {
          // console.log("sb badiya h")
          let html = `<h3>Dear Seller, welcome to EasyShopping!<br>  <a href="http://localhost:3000/verifyadminmail/${obj.mailToken}">click here </a>to verify your account</h3>`;

          let subject = "one last step";
          sendEmail(
            obj.email,
            obj.mailToken,
            html,
            subject,
            function (err, data) {
              if (err) {
                // res.render("adminsignup", { err: "something went wrong" });
                
        res.json({msg:"adminsignup"});
                return;
              }

              req.session.is_logged_in = true;
              // req.session.username = req.body.username;
              req.session.useremail = req.body.email;
              // req.session.is_verified = true;

              // res.render("notverified");
              
        res.json({msg:"notverified"});
            }
          );
        });
      }
      // return val;
    })
    .catch(function (err) {
      // res.render("adminsignup", {
      //   err: "User already exits. Please change the signup details",
      // });
      
      res.json({msg:"adminsignup"});
    });
};

module.exports = {
  AdminSignupGET,
  AdminSignupPOST,
};
