const db = require("../../methods/dbConnection");
const addProductItems = (req, res) => {
  let obj = {
    productname: req.body.productName,
    productprice: parseInt(req.body.price),
    description: req.body.description,
    productimg: req.file.filename,
    productqty: parseInt(req.body.qty),
  };
  
  let id = req.session.personid;

  let query = `insert into products (personid, name, price, description, imgId, stock) values(${id},'${obj.productname}', ${obj.productprice},'${obj.description}','${obj.productimg}', ${obj.productqty})`;

  db(query).then(function () {
    // res.render("adminproducts", { data: "Product added successfully" });
    
    res.json({msg:"done"});
  }).catch(function(err){
     res.json({msg:"undone"})
  });
};

module.exports = { addProductItems };
