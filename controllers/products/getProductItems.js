const db = require("../../methods/dbConnection");
const getProductItems = (req, res) => {
  let load = req.body.load;
  let query = `select * from products where status > 0 order by productid offset ${load} rows fetch next 5 rows only`
  // console.log("query", query)
  db(query).then(function (products) {

    res.json(products);
    
  });
 
};

module.exports = { getProductItems };
