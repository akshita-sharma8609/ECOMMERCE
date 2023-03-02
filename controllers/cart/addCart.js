const db = require("../../methods/dbConnection");
const addCart = function (req, res) {
  let pro_id = req.body.ID;
  let user_id = req.session.personid;

  let query = `select * from cart where personid='${user_id}' and productid = '${pro_id}'`;
  db(query).then(function (result) {
    if (result.length > 0) {
      query = `select * from products where productid= '${pro_id}'`;
      db(query).then(function (data) {
        // if (result[0].qty + 1 <= data[0].qty) {
        query = `update cart set qty='${
          result[0].qty + 1
        }' where personid='${user_id}' and productid = '${pro_id}'`;
        db(query).then(function () {
          // res.send({ msg: "succes" });
          res.end();
        });
        // }
        // else {
        //     res.send({ msg: "qty limit exceeded" });
        // }
      });
    } else {
      query = `insert into cart (personid, productid, qty) values(${user_id}, ${pro_id}, ${1})`;
      db(query).then(function () {
        res.send({ msg: "successsss" });
      });
    }
  });
};

module.exports = { addCart };
