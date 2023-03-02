const db = require("../../methods/dbConnection");
const removeProduct = (req, res) => {
  let person_id = req.session.personid;
  let product_id = req.body.product_id;
  let query = `delete from cart where personid=${person_id} and productid = ${product_id}`;
  db(query).then(function () {
    res.end();
  });
};

module.exports = { removeProduct };
