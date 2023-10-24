const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


function getManager(req, res) {
    let token = req.cookies.authToken;
    const { userID, role, name } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(role, name)


    if(role && role == 'manager'){
        console.log(`Welcome ${name} Your role is ${role}`);
        return res.status(200).json({status: "success", message: `Welcome ${name}, Your Role is ${role}`})
    }

    return res.status(403).json({"status": 'failed', "message": "You dont have acces to this role"});
}



module.exports = { getManager } ;