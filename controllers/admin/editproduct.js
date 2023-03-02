const db = require("../../methods/dbConnection");

const AdminEditProductGET = (req, res)=>{
    let role = req.session.role;
    let id = req.query.pid;
    id = parseInt(id)
    req.session.editproductid = id;
    console.log(id)
    if(role == 2){

        let query  = `select * from products where productid = ${id}`;
        db(query).then(function(product){
            console.log(product)
            let obj = {
                product_name : product[0].name,
                product_price : product[0].price,
                product_stock : product[0].stock,
                product_img: product[0].imgId,
                product_descp : product[0].description
            }
console.log(obj)
            res.render("editproduct", {data:obj});
        })
       
    }
    else{
        res.redirect("/adminlogin");
    }
}

const AdminEditProductPOST = (req, res)=>{
    let product_name= req.body.productName;
    let product_price = req.body.price;
    let product_stock =  req.body.qty;
    let product_descp = req.body.description; 
    let product_img ;
    console.log(req.file)
    if(req.file){
        product_img = req.file.filename;
        let query = `update products set name = '${product_name}', price=${product_price}, description = '${product_descp}', imgId = '${product_img}', stock = ${product_stock}  where productid=${req.session.editproductid} and personid=${req.session.personid}`
             db(query).then(function(){
                res.json({msg:"updatedsuccessfully"});
    })
    }else {
        let query = `select * from products where productid = ${req.session.editproductid}`;
        db(query).then( function(product){
             product_img = product[0].imgId;
             let query = `update products set name = '${product_name}', price=${product_price}, description = '${product_descp}', imgId = '${product_img}', stock = ${product_stock} where productid=${req.session.editproductid} and personid=${req.session.personid} `
             db(query).then(function(){
                res.json({msg:"updatedsuccessfully"});
    })
        })
    }

    
   
    
}

module.exports = {
    AdminEditProductGET,
    AdminEditProductPOST
}