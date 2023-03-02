const db = require("../../methods/dbConnection");

const buyerVerifyMailGET = function (req, res) {
  let token = req.params; //extracting the token from request
//  console.log(req.params);
  //reading file anc matching the token stored in the file with the request token
  let query = `select * from person where mailToken=${token.token} `;
  db(query).then(function () {
    query = `update person set isverified='${1}' where mailToken='${token.token}'`;
    db(query).then(function () {
      query = `select * from person where mailToken=${token.token}`;
      db(query).then(function (user) {
        // console.log(user);

        if (req.session.user) {
          console.log(req.session.user[0]);
          req.session.personid = user[0].personid;
          req.session.is_verified = true;
          req.session.useremail = user[0].email;
          res.render("home.ejs", {
            user_role: user[0].role,
          });
        } else {
          req.session.user = user;
          req.session.personid = user[0].personid;
          req.session.is_logged_in = true;
          req.session.useremail = user[0].email;
          req.session.is_verified = true;
          console.log(req.session);
          res.render("home.ejs", {
            user_role: user[0].role,
          });
        }
      });
    });
    console.log("sb badiya h");
  });
};

module.exports = {
  buyerVerifyMailGET,
};
