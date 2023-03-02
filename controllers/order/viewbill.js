
const db = require("../../methods/dbConnection");
const ViewBill = (req, result)=>{
    let  order_id = req.query.orderid;
    // console.log("orderrrrridddddd", order_id)
    let query = `select * from orders where orderid=${order_id}`
    db(query).then(function(res){
        let order_date = res[0].orderedDate;
        let total_bill = res[0].total; 
        let query = `select * from orderitem where orderid=${order_id}`;
        db(query).then(function(products){
            // console.log("ye productsssss ayeeee haaiiii")
            // console.log(products)
          
            result.render("viewBill", {data:products, order_date:order_date, total_bill:total_bill})
        })
    })
    

}

module.exports = {
    ViewBill
}