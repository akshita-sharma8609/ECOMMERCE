const db = require("../../methods/dbConnection");
const updateorderstatus = (req, res)=>{
    console.log(req.body);
    let req_status = req.body.data;
    let order_id = req.body.order_id;
    let product_id = req.body.product_id;
    let query = `update orderitem set status='${req_status}' where orderid=${order_id} and productid = ${product_id}`;
console.log("query", query)
    db(query).then(function(){
        res.json({msg:"success"});
    }).catch(function(err){
        res.json({msg:"fail"});
    })
}

module.exports = {updateorderstatus};