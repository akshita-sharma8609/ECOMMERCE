const path = require("path")
const db = require('../../methods/dbConnection');
const sendEmail = require('../../methods/sendEmail')
const BuyerSignupGET = (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../../public/signup/signup.html"))
};
const BuyerSignupPOST = (req, res) => {

    let req_email = req.body.email;
    let query = `select COUNT(email) from person where email='${req_email}'`

    db(query).then(function (val) {

        return val; 
    }).then(function (val) {
        val = parseInt(val)
        let signup_flag = true;
        if (val) signup_flag = false;

        if (req.body.password.length < 8) {
            // res.render("signup", { err: "Please use strong password of atleast 8 characters " })
            res.status(400).json({msg:"signup", err: "Please use strong password of atleast 8 characters "})
            return;
        }
        else if (signup_flag) {

            let obj = {
                // username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                is_verified: 0,
                role: 1,
                mailToken: Date.now(),
                address:  req.body.address
            }
            // console.log(obj);
            //insert data into db
            query = `insert into person(email, password, isverified, mailToken, role, address) values('${obj.email}', '${obj.password}', '${obj.is_verified}', '${obj.mailToken}', ${obj.role}, '${obj.address}')`

            db(query).then(function () {
                // console.log("sb badiya h")
                let html = `<h3>Dear customer, welcome to EasyShopping!<br>  <a href="http://localhost:3000/verifymail/${obj.mailToken}">click here </a>to verify your account</h3>`

                let subject = 'one last step';
                sendEmail(obj.email, obj.mailToken, html, subject, function (err, data) {

                    if (err) {
                        // res.render("signup", { err: "something went wrong" })
                        res.json({msg:"signup", err: "something went wrong"});
                        return
                    }
                    else{

                    
                    req.session.is_logged_in = true;
                    // req.session.username = req.body.username;
                    req.session.useremail = req.body.email;

                    // res.render("notverified");
                    
                    res.json({msg:"notverified"});
                    }
                })
            })
        }

        else {
            
            res.json({msg:"signup",  err: "User already exits. Please change the signup details" });
            // res.render("signup", { err: "User already exits. Please change the signup details" })
        }
    })


    //check for the password length must be greater than or equal to 8

};
module.exports = {
    BuyerSignupGET,
    BuyerSignupPOST,
};