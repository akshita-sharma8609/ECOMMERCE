require("express-async-errors");
const errorhandler = require("./extra/errorhandler");
const express = require("express");
const session = require("express-session");
const app = express();
const db = require("./methods/dbConnection");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const port = 3000;

const http = require('http').Server(app);

// ---------------------------------------- CONTROLLERS ---------------------------------------------------

const {
  BuyerloginGET,
  BuyerloginPOST,
  BuyerSignupGET,
  BuyerSignupPOST,
  buyerVerifyMailGET,
  BuyerchangePassowrdGET1,
  BuyerchangePassowrdGET2,
  BuyerchangePasswordPOST,
  BuyerForgotPasswordGET,
  BuyerBecomeSeller,
  BuyerForgotPasswordPOST,
} = require("./controllers/buyer");

const {
  AdminloginGET,
  AdminloginPOST,
  AdminSignupGET,
  AdminSignupPOST,
  AdminVerifyMailGET,
  AdminchangePassowrdGET1,
  AdminchangePassowrdGET2,
  AdminchangePasswordPOST,
  AdminForgotPasswordGET,
  AdminBecomeBuyer, 
  AdminForgotPasswordPOST,
  AdminUploadedProductsGET,
  AdminEditProductGET,
  AdminEditProductPOST,
  AdminUpdateProductStatusPOST
} = require("./controllers/admin");

const {
  addProduct,
  addProductItems,
  getProductItems,
} = require("./controllers/products");

const {
  // addCart,
  // cart,
  // removeProduct,
  updateQty,
} = require("./controllers/cart");

const { cart } = require("./controllers/cart/cart");
const { addCart } = require("./controllers/cart/addCart");
const { removeProduct } = require("./controllers/cart/removeProduct");

const { BuyItem } = require("./controllers/order/buyitem")
const { placeorder } = require("./controllers/order/placeorder")
const { ViewBill } = require("./controllers/order/viewbill")
const {trackorder}  = require("./controllers/order/trackorder")
const {productorders} = require("./controllers/order/productorders")
const {updateorderstatus} = require("./controllers/order/updateorderstatus");
// ------------------------------------------------------------------------------------------------

app.set("view engine", "ejs"); //specifying the tempelate engine to be used
app.use(express.static("public"));
app.use(express.static("controllers"));
app.use(express.static(__dirname + "/products"));
app.use(express.static("uploads"));
app.use(express.static(__dirname + "/products"));
app.use(express.static("admin"));
app.use(express.urlencoded({ extended: true })); //to extract the data from form
app.use(express.json()); //to extract json data

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// -------------------------------- handles the home page request
app.get("/", (req, res) => {
  try {
    let query = `select * from person where email='${req.session.useremail}'`;

    db(query)
      .then(function (result) {
        req.session.is_verified = result[0].isverified;

        if (req.session.is_logged_in && req.session.is_verified) {
          res.render("home.ejs", {
            user_role: result[0].role,
          });
        } else if (req.session.is_logged_in && !req.session.is_verified) {
          res.render("notverified");
        } else res.sendFile(__dirname + "/public/home/home.html");
      })
      .catch(function (err) {
        res.sendFile(__dirname + "/public/home/home.html");
      });
  } catch (e) {
    res.sendFile(__dirname + "/public/home/home.html");
  }
});

// ------------------------------------------------Buyer--------------------------------------------
app.route("/login").get(BuyerloginGET).post(upload.single("abc"),BuyerloginPOST);
app.route("/signup").get(BuyerSignupGET).post(upload.single("abc"),BuyerSignupPOST);
app.get("/verifymail/:token", buyerVerifyMailGET);
app.route("/changepassword").get(BuyerchangePassowrdGET1).post(upload.single("abc"),BuyerchangePasswordPOST);
app.get("/changepassword/:token", BuyerchangePassowrdGET2);
app.route("/forgotpassword").get(BuyerForgotPasswordGET).post(upload.single("abc"),BuyerForgotPasswordPOST);


//-------------------------------------------------Seller--------------------------------------------
app.route("/adminlogin").get(AdminloginGET).post(upload.single("abc"),AdminloginPOST);
app.route("/adminsignup").get(AdminSignupGET).post(upload.single("abc"),AdminSignupPOST);
app.get("/verifyadminmail/:token", AdminVerifyMailGET);
app.route("/adminchangepassword").get(AdminchangePassowrdGET1).post(upload.single("abc"),AdminchangePasswordPOST);
app.get("/adminchangepassword/:token", AdminchangePassowrdGET2);
app.route("/adminforgotpassword").get(AdminForgotPasswordGET).post(upload.single("abc"),AdminForgotPasswordPOST);
app.get("/becomeSeller", BuyerBecomeSeller);
app.get("/uploadedproducts", AdminUploadedProductsGET);

app.route("/editproduct").get(AdminEditProductGET).post(upload.single("productImg"),AdminEditProductPOST)

 
//--------------------------------------------Products-----------------------------------------------
app.get("/addproduct", addProduct);
app.post("/addproductitems", upload.single("productImg"), addProductItems);
app.post("/getproductitems", getProductItems);
app.post("/updateproductstatus", AdminUpdateProductStatusPOST)

//---------------------------------------------CART----------------------------------------------------
app.route("/cart").get(cart);
app.post("/addcart", addCart);
app.post("/updateqty", updateQty);
app.post("/removeproduct", removeProduct);

// app.get("/becomeBuyer", AdminBecomeBuyer);
app.post("/buyitem", BuyItem);
app.post("/placeorder", placeorder);


//----------------handles the route for logout, it deletes the data stored in the session storage of server
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//render the page after the successful addition of product in products range
app.get("/adminproducts",(req,res)=>{
  res.render("adminproducts", {data:"success"})
})

app.get("/pswrdmessage", (req,res)=>{
  console.log("ana to ye hi chahiye")
  res.render("pswrdmessage"); 
})

app.get("/viewBill", ViewBill)

app.get("/trackorder", trackorder);
app.get("/productorders", productorders);
app.post("/updateorderstatus", updateorderstatus);

app.get("*", (req, res) => {
  res.send("404");
});

app.use(errorhandler)

//---------- runs the server the server starts its running from this point
app.listen(port, () => {
  console.log("Server Running at", port);
});
