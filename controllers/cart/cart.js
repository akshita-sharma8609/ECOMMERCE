const db = require("../../methods/dbConnection");
const cart = (req, res) => {
  try {
    let user_id = req.session.personid;
    if(!user_id) res.redirect("/");
    else{
    let query = `select * from cart join products on cart.productid=products.productid where cart.personid=${user_id} `;
    try {
      db(query).then(function (result) {
       let address;
        query = `select * from person where personid=${user_id}`
        db(query).then(function(user){

          address = user[0].address;
          // console.log("address", address)
          
        res.render("cart", { result:result, address:address });
        })

      });
    } catch (e) {
      res.redirect("/");
    }
  }
}
   catch (e) {
    res.redirect("/");
  }
};

module.exports = { cart };
