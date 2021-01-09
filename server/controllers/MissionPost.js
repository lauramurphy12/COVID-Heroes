const dbC = require('../dbController.js');
const express = require("express")
const Joi = require('joi');

const { MissionPost }   = require('../models');
const { User }  =  require('../models');
const { Citizen } =  require('../models');

const cors = require('cors');
const { verifyJWT, verifyCitizenRole } = require('../middleware/tokenProcessing');

const router = express.Router();

router.all('*', cors());


router.get('/missions', (req, res) => {
    res.json({ message: "" });
});

// Add new mission post for logged in citizen. Route uses verifyToken and verifyCitizenRole 
// middleware functions
router.post('/missions/add', verifyJWT, verifyCitizenRole, async(req, res) => {
    try{
        await dbC.openConnection();
        const missionPostParams = req.body;
        const id = req.user.user.id;
        const citizen = await dbC.innerJoin(Citizen, User, id);
        const citizenID = citizen[0].dataValues.id;
        missionPostParams.CitizenId = citizenID;
        // create post validation schema
        const postSchema = Joi.object().keys({
          title:Joi.string().min(4).max(30).required(),
          description: Joi.string().min(5).max(100).required(),
          CitizenId: Joi.string().required(),
        });
        //validate mission post data with specified schema before making call to dbController 
        const validatedParams = postSchema.validate(missionPostParams);
        if(validatedParams.error == null){
          // call insert wrapper function in dbController
          inserted = await dbC.insert(MissionPost, missionPostParams);
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


// Get all Mission Posts for logged in citizen. Route uses verifyToken and verifyCitizenRole 
// middleware functions
router.get('/missions/allMissions', verifyJWT, verifyCitizenRole, async(req, res) => {
    try{
        await dbC.openConnection();
        const id = req.user.user.id;
        const getAuthCitizen = await dbC.innerJoin(Citizen, User, id);
        const citizenID = getAuthCitizen[0].dataValues.id;
        const getMissionPostsByCitizen = await dbC.innerJoin(MissionPost, Citizen, citizenID);
        res.send(getMissionPostsByCitizen);
        await dbC.close();
     }catch(error){
        res.status(401).send({ message: error.message });
     }
});

// Get most recently created mission post for logged in citizen. Route uses verifyToken and verifyCitizenRole middleware functions
router.get('/missions/activeMissionPost', verifyJWT, verifyCitizenRole, async(req, res) => {
    try{
        await dbC.openConnection();
        const id = req.user.user.id;
        const getAuthCitizen = await dbC.innerJoin(Citizen, User, id);
        const citizenID = getAuthCitizen[0].dataValues.id;
        const foreignKeyPair = {CitizenId: citizenID}
        const activeMissionPost = await dbC.findLastCreated(MissionPost, foreignKeyPair);
        res.send(activeMissionPost);
        await dbC.close();
     }catch(error){
        res.status(401).send({ message: error.message });
     }
});

module.exports = router;
