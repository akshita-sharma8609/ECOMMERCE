const db = require("../../methods/dbConnection");
const path = require("path");

const BuyerloginGET = (req, res) => {
  if (req.session.is_logged_in && req.session.is_verified ) {
    res.redirect("/");
  } else if (req.session.is_logged_in && !req.session.is_verified) {
    res.render("notverified");
  } else {
    res.sendFile(path.resolve(__dirname + "/../../public/login/login.html"));
  }
};

const BuyerloginPOST = (req, res, callback) => {
  // console.log("req mein ye data aya h ", req.body);

  let req_email = req.body.email;
  let req_password = req.body.password;

  let query = `select * from person where email='${req_email}' and password='${req_password}'`;
  db(query)
    .then(function (result) {
      if (Object.keys(result).length === 0)
      res.json({msg:"signup", err: "You are not registered. Please register yourself."});
        // res.render("signup.ejs", {
        //   err: "You are not registered. Please register yourself.",
        // });
      else {
        req.session.is_logged_in = true;
        // req.session.username = req.body.username;
        req.session.useremail = req.body.email;
        let user_role = result[0].role;
        req.session.role = user_role;
        req.session.personid = result[0].personid;
        if(result[0].isverified){
          req.session.is_verified = true;
        // res.render("home.ejs", {
        //   user_role: user_role,
        // });
        
      
        res.json({msg:"done"});
        callback();
      }else{
        req.session.is_verified = false;
        res.json({msg:"notverified"});
        callback();
        // res.render("notverified");
      }
      }

    })
    .catch(function (err) {
      // res.render("signup.ejs", {
      //   err: "You are not registered. Please register yourself.",
      // });
      res.json({msg:"signup", err: "You are not registered. Please register yourself."})
    });
};

module.exports = {
  BuyerloginGET,
  BuyerloginPOST,
};
