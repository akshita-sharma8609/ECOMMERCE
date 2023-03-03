
const db = require("../../methods/dbConnection");
const trackorder = (req, res) => {
    let personid = req.session.personid;
    console.log("ye pda h session mein",req.session)
    console.log("identify kr ske",personid)
    if(!personid){
        res.status(404).send({msg:"user not found"});
    }

    else{
        let query = `select * from orders where personid = ${personid}`;
        db(query).then(function(result){
            res.render("trackorder",{result:result});
        })
    }

}

module.exports = { trackorder }