const dbC = require('../dbController.js');
const express = require("express")
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User}   = require('../models');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cors = require('cors');
const { verifyJWT } = require('../middleware/tokenProcessing');
const router = express.Router();

router.all('*', cors());


router.get('/auth', (req, res) => {
    res.json({ message: "Welcome to Users!" });
});

router.post('/auth/signup', async(req, res) => {
    try{
      await dbC.openConnection();
      const createUserParams = req.body;
      const userSchema = Joi.object().keys({
          firstName:Joi.string().min(2).max(15).required(),
          lastName: Joi.string().min(5).max(25).required(),
          email: Joi.string().required().email({minDomainSegments: 2, tlds: { allow: ['com'] }}),
          userType: Joi.string().required(),
          username: Joi.string().alphanum().min(5).max(20).required(),
          password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
      });
      //validate user data with specified schema before making call to dbController
      const validatedParams = userSchema.validate(createUserParams);
      if(validatedParams.error == null){
          // call wrapper function in dbController
          inserted = await dbC.insert(User, createUserParams);
          console.log("Inserted", inserted);
          res.json(inserted);
      }
      else{
         res.status().json({
             message: 'Failed to insert'
         })
      }
      await dbC.close();
    }catch(e){
       console.log(e);
   }
});

router.post('/auth/login', async(req, res) => {
    try{
        await dbC.openConnection();
        const loginRequest = {username : req.body.username};
        const user = await dbC.getInstance(User, loginRequest);
        if(user == null){
            res.status(401).send({
                message: 'User does not exist'
            });
        }
        else{
            const isAuthenticated = await bcrypt.compare(req.body.password, user.passwordHash);
            if(isAuthenticated){
                const jsonWebToken = jwt.sign({user}, process.env.SECRET_KEY,{
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });
                const decoded = jwt.decode(jsonWebToken, {complete:true});
                const currentUser = decoded.payload.user;
               res.status(200).send({
                    token: jsonWebToken,
               });
            }else{
                res.status(401).send({
                    message: 'You are not a valid user! No website for you!'
                });
            }
        }
        await dbC.close();   
    }catch(e){
        console.log(e);
    }
});

router.post('/auth/update', verifyJWT, async(req, res) => {
    try{
        await dbC.openConnection();
        const updateUserParams = req.body;
        const userSchema = Joi.object().keys({
            firstName:Joi.string().min(2).max(15).required(),
            lastName: Joi.string().min(5).max(25).required(),
            email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com'] }}),
            userType: Joi.string().required(),
            username: Joi.string().alphanum().min(5).max(20).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')),
        })
        

        await dbC.close();   
    }catch(e){
        console.log(e);
    }
});

/*




router.get('/users/:id', async (req, res) => {
    try{
        await dbC.openConnection();
        const userID = req.params.id;
        userByID = await dbC.getByPK(User, userID);
        res.json(userByID);
        await dbC.close();   
    }catch(e){
        console.log(e);
    }
});




router.get('auth/users', async (req, res) => {
    try{
        await dbC.openConnection();
        users = await dbC.getAll(User);
        res.json(users);
        await dbC.close();   
        
    }catch(e){
        return res.status(500).send(e);
    }
}); */
module.exports = router;



