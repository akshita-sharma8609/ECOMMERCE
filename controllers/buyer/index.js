const { BuyerloginGET, BuyerloginPOST } = require("./login");
const { BuyerSignupGET, BuyerSignupPOST } = require("./signup");
const { buyerVerifyMailGET } = require("./verifyemail");
const {socketConnection} = require("../socket/socketConnection")
const {
  BuyerchangePassowrdGET1,
  BuyerchangePassowrdGET2,
  BuyerchangePasswordPOST,
} = require("./changePassword");

const {
  BuyerForgotPasswordGET,
  BuyerForgotPasswordPOST,
} = require("./forgotPassword");

const { BuyerBecomeSeller } = require("./becomeSeller");

module.exports = {
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
  socketConnection
};
