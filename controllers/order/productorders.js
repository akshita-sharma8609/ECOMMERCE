
const db = require("../../methods/dbConnection");
const productorders = (req, res)=>{
console.log("ye query hhh", req.query);
let product_id = req.query.productid;

let query = ` select * from orders join orderitem on orders.orderid = orderitem.orderid where orderitem.productid=${product_id} order by orders.orderedDate desc`

db(query).then(function(result){
    console.log("data", result);
    res.render("productorders",{result:result});
})


}

module.exports = {productorders}