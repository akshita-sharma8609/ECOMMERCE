const db = require("../../methods/dbConnection");

const BuyerBecomeSeller = function (req, res) {
  let id = req.session.personid;
  req.session.role = 2;
  let query = `update person set role=${2} where personid = ${id}`;
  db(query).then(function () {
    res.render("home.ejs", {
      user_role: 2,
    });
  });
};

module.exports = {
  BuyerBecomeSeller,
};
