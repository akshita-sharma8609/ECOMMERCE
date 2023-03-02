const db = require("../../methods/dbConnection");
const AdminUploadedProductsGET = (req, res) => {
    try {
        let role = req.session.role;
        let person_id = req.session.personid;
        if (role == 2) {

        
            let query = `select * from products where personid = ${person_id}`
            db(query).then(function(products){
                
                console.log("ye products aye h ", products);
                if(products.length>0){
                    res.render("uploadedproducts", { result: products , err:null});
                }
                else{
                     res.render("uploadedproducts", { result:[], err: "You haven't uploaded any products!" });
                }
                
            }).catch(function(Err){
            console.log(Err);
            })
                
            
        }
    }
    catch (err) {
        res.redirect("/adminlogin");
    }
}

module.exports = {
    AdminUploadedProductsGET
}