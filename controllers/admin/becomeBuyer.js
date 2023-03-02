const db = require("../../methods/dbConnection");

const AdminBecomeBuyer = function (req, res) {
  let id = req.session.personid;
  let query = `update person set role=${2} where personid = ${id}`;
  db(query).then(function () {
    res.render("home.ejs", {
      user_role: 2,
    });
  });
};

module.exports = {
  AdminBecomeBuyer,
};
