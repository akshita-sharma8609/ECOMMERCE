const { AdminloginGET, AdminloginPOST } = require("./login");
const { AdminSignupGET, AdminSignupPOST } = require("./signup");
const { AdminVerifyMailGET } = require("./verifyemail");
const {
  AdminchangePassowrdGET1,
  AdminchangePassowrdGET2,
  AdminchangePasswordPOST,
} = require("./changePassword");
const {
  AdminForgotPasswordGET,
  AdminForgotPasswordPOST,
} = require("./forgotPassword");
const { AdminBecomeBuyer } = require("./becomeBuyer");

const { AdminUploadedProductsGET } = require("./uploadedproducts");
const {AdminEditProductGET,
AdminEditProductPOST} = require("./editproduct");

const {AdminUpdateProductStatusPOST} = require("./updateproductstatus");
module.exports = {
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
};
