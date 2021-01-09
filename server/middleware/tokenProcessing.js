
const jwt = require("jsonwebtoken");
const { User }  =  require('../models');
const { Citizen } =  require('../models');

const verifyJWT = (req, res, next) =>  {
    const jwtToken = req.headers['authorization'];
    if(req.headers.authorization != null){
       try{
            const user = jwt.verify(jwtToken, process.env.SECRET_KEY);
            req.user = user;
            next();
       }catch(e){
           // Forbidden client error. Server refused to authorized client request
           res.status(403).send({message: "Token could not be verified"});
       }
    }else{
        // Invalid authentication credentials for the specfied resource
       res.status(401).send({message: 'Unauthorized client'}); 
    } 
};
   

const verifyCitizenRole = async (req, res, next) => {
    console.log("The request user passed from verifyJWT function is: ", req.user);
    if(req.user.user.userType == 'citizen'){
        console.log("You are a citizen");
        next();
    }
    else{
        res.status(401).send({message: 'Unauthorized user role for the specified resource'});
    }
};



/* To do -for when token expires
const refreshToken = (req, res, next) => {
    
    
    
    
}
*/

module.exports = { verifyJWT, verifyCitizenRole };
