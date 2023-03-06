const path = require("path");
const db = require("../../methods/dbConnection");
const addProduct = (req, res) => {
  let email = req.session.useremail;
  
  // console.log("eeeeeeeeeeemail", email)
  if(!email){
    res.redirect("/adminsignup");
  }
  
  else{
    let query = `select * from person where email='${email}' and role=${2}`;
    db(query).then(function(user){
      if(user.length>0){
        res.sendFile(path.resolve(__dirname + "/../../admin/admin.html"));
      }else{
        res.redirect("/adminsignup");
      }
    })
  }
};

module.exports = { addProduct };
