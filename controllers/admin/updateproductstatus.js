const db = require("../../methods/dbConnection");

const AdminUpdateProductStatusPOST = (req, res)=>{
    let product_id = req.body.id;
console.log(req.body)
    
    let query = `select * from products where productid = ${product_id}`;
    db(query).then(function(product){
            let toggle_status=0;
            if(product[0].status==0) toggle_status=1;
            query = `update products set status=${toggle_status} where productid=${product_id}`
            db(query).then(function(){
                res.json({msg:"updatedsuccessfully"})
            })
        
    })
}

module.exports = {
    AdminUpdateProductStatusPOST
}