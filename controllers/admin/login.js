const db = require("../../methods/dbConnection");
const path = require("path");

const AdminloginGET = function (req, res) {
  // res.sendFile(path.resolve(__dirname + "/../../admin/adminlogin.html"));
  if (req.session.is_logged_in && req.session.is_verified && req.session.role==2) {
    res.render("home.ejs", {
      user_role: req.session.role,
    });
  } else if (req.session.is_logged_in && !req.session.is_verified) {
    res.render("notverified");
  } else {
    res.sendFile(path.resolve(__dirname + "/../../admin/adminlogin.html"));
  }
};

const AdminloginPOST = function (req, res) {
  let req_email = req.body.email;
  let req_password = req.body.password;
  let query = `select * from person where email='${req_email}' and password='${req_password}'`;
  db(query)
    .then(function (result) {
      if (Object.keys(result).length === 0)
        // res.render("adminsignup.ejs", {
        //   err: "You are not registered. Please register yourself.",
        // });
        res.json({msg:"adminsignup"});
      else {
        req.session.is_logged_in = true;
        // req.session.username = req.body.username;
        req.session.useremail = req.body.email;
        req.session.personid = result[0].personid;
        let user_role = result[0].role;
        if(user_role==1){
          res.json({msg:"becomeseller"})
          return;
        }
        req.session.role = user_role;
        if(result[0].isverified){
          req.session.is_verified = true;
        // res.render("home.ejs", {
        //   user_role: user_role,
        // });
        res.json({msg:"done"})
      }else{
        req.session.is_verified = false;
        // res.render("notverified");
        res.json({msg:"notverified"})
      }
        // res.redirect("/addproduct");
      }
    })
    .catch(function (err) {
      // res.render("adminsignup.ejs", {
      //   err: "You are not registered. Please register yourself.",
      // });
      res.json({msg:"adminsignup"})
    });
};

module.exports = {
  AdminloginGET,
  AdminloginPOST,
};
