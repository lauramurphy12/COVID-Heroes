const Axios = require('axios');
// base api for express missionpost controller
const BASE_API_URL = 'http://localhost:4000/missions/';

// send a POST request to add a new mission post for a citizen
const addMissionPost = async function(missionPostArgs){
    try{
       const newMissionPost = await Axios({
            method: 'post',
            url: BASE_API_URL + 'add',
            data: missionPostArgs,
            headers: {
                'Content-Type': 'application/json',
            },
        });
       return newMissionPost;
    }catch(error){
       console.log("error"); 
    }
}

// send a GET request to get all mission posts for citizen
const getAllMissionPosts = async function(){
     try{
       const allMissionPosts = await Axios({
            method: 'get',
            url: BASE_API_URL + 'allMissions',
            headers: {
                'Content-Type': 'application/json',
            },
        });
       return allMissionPosts;
    }catch(error){
       console.log("error"); 
    }
}

//send a GET request to get the most recent(active) mission post
const getActivePost = async function(){
     try{
       const activePost = await Axios({
            method: 'get',
            url: BASE_API_URL + 'activeMissionPost',
            headers: {
                'Content-Type': 'application/json',
            },
        });
       return activePost;
    }catch(error){
       console.log("error"); 
    }
}




addMissionPost();
getAllMissionPosts();
getActivePost();
exports.addMissionPost = addMissionPost;
exports.getAllMissionPosts = getAllMissionPosts;
exports.getActivePost = getActivePost;
