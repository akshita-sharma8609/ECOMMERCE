const db = require("../../methods/dbConnection");
const updateQty = (req, res) => {
  let quantity = req.body.quantity;
  let person_id = req.body.person_id;
  let product_id = req.body.product_id;

  query = `update cart set qty=${quantity} where personid = ${person_id} and productid = ${product_id}`;
  db(query).then(function () {
    res.end();
  });
};

module.exports = { updateQty };
