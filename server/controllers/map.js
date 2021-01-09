const dbC = require('../dbController.js');
const express = require("express")
const { locationUpdate }   = require('../models');
const { User }  =  require('../models');
const cors = require('cors');
const { verifyJWT } = require('../middleware/tokenProcessing');

const router = express.Router();

router.all('*', cors());

router.get('/mapActions', (req, res) => {
    res.json({ message: "" });
});

// POST request to add new location update for currently logged in user whenever the map dashboard is displayed
router.post('/mapActions/addLocation', verifyJWT, async(req, res) => {
    try{
        await dbC.openConnection();
        const coordinates = req.body;
        const id = req.user.user.id;
        console.log("coordinates from object are: ", Object.values(coordinates));

        var point = {
            type: 'Point',
           coordinates: Object.values(coordinates),
       }
        var locationUpdateParams = {
            POINT: point,
            UserId: id,
        }
         inserted = await dbC.insert(locationUpdate, locationUpdateParams);
        res.json(inserted);

        
      await dbC.close();
    }catch(e){
       console.log(e);
   }
});

// Get most recent location for logged in user. Route uses verifyToken 
// middleware function

router.get('/mapActions/getLocation', verifyJWT, async(req, res) => {
    try{
        await dbC.openConnection();
        const UserId = req.user.user.id;
        const getUpdatesByUser= await dbC.innerJoin(locationUpdate, User, UserId);
        const userID = getUpdatesByUser[0].dataValues.id;
        const foreignKeyPair = {UserId: UserId}
        const getLastUpdate = await dbC.findLastCreated(locationUpdate, foreignKeyPair);
        console.log("get last update is: ", getLastUpdate);
        res.send(getLastUpdate);
        await dbC.close();
     }catch(error){
        res.status(401).send({ message: error.message });
     }
});

module.exports = router;
