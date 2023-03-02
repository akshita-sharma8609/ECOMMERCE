
const db = require("../../methods/dbConnection");
const { createConnection } = require("../../methods/db");
const connection = createConnection();
const BuyItem = async (req, res) => {
    let user_id = req.session.personid;
    if (!user_id) {
        res.redirect("/");
    }

    else {
        try {
            (await connection).beginTransaction();

            let product_id = req.body.product_id;
            let address = req.body.address;
            if (!address) {
                res.status(404).send({ msg: "please send address " });
            }

            else if (!product_id) {
                res.status(404).send({ msg: "please send product id" });
            }

            else {
                let query = `select * from cart join products on cart.productid = products.productid where cart.personid=${user_id} and cart.productid=${product_id}`;
                db(query).then(function (result) {
                    if (result.length > 0) {
                        if (result[0].qty <= result[0].stock) {
                            let productdetails = {
                                products: [{
                                    name: result[0].name,

                                    price: result[0].price,
                                    qty: result[0].qty,
                                    productid: result[0].productid,
                                    status: "ordered"
                                }
                                ],
                                total: result[0].price * result[0].qty
                            }
                            // productdetails = JSON.stringify(productdetails);
                            query = `insert into orders (personid,total, delivery_address) output inserted.orderid as order_Id values(${user_id}, ${productdetails.total}, '${address}')  `


                            db(query).then(function (orderid) {
                                // console.log("orderrridd", order_id)
                                let order_id = orderid[0].order_Id
                                // order_id = 6;
                                query = `insert into orderitem(orderid, productid, name , price, qty, status) values(${order_id}, ${productdetails.products[0].productid}, '${productdetails.products[0].name}', ${productdetails.products[0].price}, ${productdetails.products[0].qty}, '${productdetails.products[0].status}' )`

                                db(query).then(function () {


                                    query = `update products set stock =${result[0].stock - result[0].qty} where productid=${product_id}`

                                    db(query).then(function () {
                                        query = `delete from cart where cartid=${result[0].cartid}`
                                        db(query).then(function () {

                                            // var today = new Date();
                                            // var now = today.toLocaleDateString('en-US');
                                            // let obj = {

                                            //     personid: user_id,
                                            //     productdetails: JSON.parse(productdetails),
                                            //     status: "ordered",
                                            //     orderedDate: now
                                            // }
                                            // res.render("viewBill", { data: obj });


                                            // res.status(200).send({ msg: "ordered successfully" })
                                            res.send({ orderid: order_id })

                                        })
                                    }).catch((err)=>{
                                        
                                        rollback_transaction(err);
                                       
                                    })
                                })
                            }).catch((err)=>{
                                rollback_transaction(err);
                            })

                        }
                        else {
                            res.status(400).send({ msg: "quantity limit exceeded" })
                        }
                    } else {
                        res.status(404).send({ msg: "product not present in cart" })
                    }
                }).catch((err)=>{
                    rollback_transaction(err);
                })
                (await connection).commitTransaction();
            }
        } catch (err) {
            rollback_transaction(err);
        }
    }
}

function rollback_transaction(err) {
    connection.rollbackTransaction();
    
    res.status(400).send({ msg: "order unsuccessful" });
    return;
}

module.exports = { BuyItem };