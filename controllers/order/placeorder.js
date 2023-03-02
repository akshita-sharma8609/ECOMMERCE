
const db = require("../../methods/dbConnection");
const placeorder = (req, res) => {
    let user_id = req.session.personid;
    let address = req.body.address;
    if (!user_id) {
        res.redirect("/");
    }

    else {

        let query = `select * from cart join products on cart.productid = products.productid where cart.personid=${user_id}`;
        db(query).then(function (result) {
            if (result.length > 0) {
                let productdetails = {
                    products: [],
                    total: 0
                }
                let flag = true;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].qty <= result[i].stock) {
                       let obj =  {
                        name: result[i].name,
                        price: result[i].price,
                        qty: result[i].qty,
                        productid: result[i].productid,
                        status: "ordered"
                        }
                        let temp_total = result[i].price * result[i].qty;

                        productdetails.products.push(obj);
                        productdetails.total+=temp_total;
                    }
                    else {
                        flag = false;
                        res.status(400).send({ msg: "quantity limit exceeded" })
                        return; 
                    }
                }

                if(flag){
                    for(let i=0;i<result.length;i++){
                        let query = `delete from cart where personid=${user_id} and productid=${result[i].productid}`
                        db(query).then(async function(){
                            query = `update products set stock = ${result[i].stock-result[i].qty} where productid=${result[i].productid}`
                            await db(query);
                        })
                    }

                    // productdetails = JSON.stringify(productdetails)
                    query = `insert into orders (personid,total, delivery_address) output inserted.orderid as order_Id values(${user_id}, ${productdetails.total}, '${address}')  `
                    db(query).then(function(orderid){
                        let order_id = orderid[0].order_Id;

                        let multi_query =  `insert into orderitem(orderid, productid, name , price, qty, status) values`;

                        for(let i =0;i<productdetails.products.length;i++){
                            query = `(${order_id}, ${productdetails.products[i].productid}, '${productdetails.products[i].name}', ${productdetails.products[i].price}, ${productdetails.products[i].qty}, '${productdetails.products[i].status}' ),`

                            multi_query+=query;
                        }

                        multi_query = multi_query.slice(0,-1);
// console.log(multi_query)
                        db(multi_query).then(function(){
                            var today = new Date();
                            var now = today.toLocaleDateString('en-US');
                            let obj = {
                            
                                personid: user_id,
                                productdetails: productdetails,
                                status:"ordered",
                                orderedDate:  now
                            }
                            // res.render("viewBill", {data:obj});
                            res.send({orderid: order_id})
                        })
                        
                    })
                }
                
            } else {
                res.status(404).send({ msg: "product not present in cart" , orderid: order_id})
            }
        })

    }
}

module.exports = { placeorder };


