var Request = require("tedious").Request;
var Connection = require("tedious").Connection;


var config = {
    server: 'localhost',
    authentication: {
        type: "default",
        options: {

            userName: "akshita",
            password: "12345",
        },
    },
    options: {
        trustServerCertificate: true,
        database: "ECommerce",
    },
};


function executeRequest(connection, query) {
    return new Promise(async (resolve, reject) => {

        var res = [];
        let request = new Request(query, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
        });
        request.on('row', function (columns) {
            var result = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result[column.metadata.colName] = column.value;
                }
            });
            res.push(result);
        });
        request.on("requestCompleted", function (rowCount, more) {


            console.log("resultttt", res)
            resolve(res);
        });
        request.on('error', (err) => {
            if (err) {
                reject(err)
            }
        })
        connection.execSql(request);
    })

}



module.exports = (user_id, product_id, address) => {
    console.log('df', user_id, product_id, address)
    return new Promise((resolve, reject) => {

        var connection = new Connection(config);
        connection.connect();
        connection.on('connect', (err) => {
            if (err) {

                reject(err)
            } else {
                console.log('df')
                connection.beginTransaction(async (err) => {
                    if (err) {
                        reject(err)

                    } else {
                        console.log('transaction init')
                        try {
                            let query1;
                            if(product_id===null){
                                query1 = `select * from cart join products on cart.productid = products.productid where cart.personid=${user_id}`
                            }
                            else{
                                query1 = `select * from cart join products on cart.productid = products.productid where cart.personid=${user_id} and cart.productid=${product_id}`
                            }

                            let result = await executeRequest(connection, query1);
                            console.log('result 1', result)
                            // let productdetails = {
                            //     products: [{
                            //         name: result[0].name,

                            //         price: result[0].price,
                            //         qty: result[0].qty,
                            //         productid: result[0].productid,
                            //         status: "ordered"
                            //     }
                            //     ],
                            //     total: result[0].price * result[0].qty
                            // }

                            let productdetails = {
                                products: [],
                                total: 0
                            }
                            for (let i = 0; i < result.length; i++) {
                                if(result[i].status===0){
                                    reject("product out of stock");
                                    return;
                                }
                                let obj = {
                                    name: result[i].name,
                                    price: result[i].price,
                                    qty: result[i].qty,
                                    productid: result[i].productid,
                                    status: "ordered"
                                }
                                let temp_total = result[i].price * result[i].qty;

                                productdetails.products.push(obj);
                                productdetails.total += temp_total;

                            }


                            for (let i = 0; i < result.length; i++) {

                                let query4 = `update products set stock =${result[i].stock - result[i].qty} where productid=${product_id}`

                                await executeRequest(connection, query4);

                                let query5 = `delete from cart where cartid=${result[i].cartid}`

                                await executeRequest(connection, query5);
                            }

                            let query2 = `insert into orders (personid,total, delivery_address) output inserted.orderid as order_Id values(${user_id}, ${productdetails.total}, '${address}')  `

                            let orderid = await executeRequest(connection, query2);

                            let order_id = orderid[0].order_Id
                            // order_id = 6;

                            let multi_query = `insert into orderitem(orderid, productid, name , price, qty, status) values`;

                            for (let i = 0; i < productdetails.products.length; i++) {
                                let query = `(${order_id}, ${productdetails.products[i].productid}, '${productdetails.products[i].name}', ${productdetails.products[i].price}, ${productdetails.products[i].qty}, '${productdetails.products[i].status}' ),`

                                multi_query += query;
                            }

                            multi_query = multi_query.slice(0, -1);
                            let query3 = multi_query;

                            await executeRequest(connection, query3);




                            connection.commitTransaction((err) => {
                                console.log('transaction comit')

                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({ data: "Done", order_id: order_id })
                                } connection.close();
                            })

                        } catch (err) {
                            console.log('transaction roll')
                            connection.rollbackTransaction((err) => {
                                resolve({ data: "Fail" })

                            })
                            connection.close();
                        }
                    }
                })
            }
        })
    })

}