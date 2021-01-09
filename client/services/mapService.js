const Axios = require('axios');
// base api for express map controller
const BASE_API_URL = 'http://localhost:4000/mapActions/';

// send a POST request to add current user coordinates as a new location update in db
const addNewLocation = async function(userCoords){
    console.log("userCoords are: ", userCoords);
    try{
        console.log("entered the try");
       const newLocUpdate = await Axios({
            method: 'post',
            url: BASE_API_URL + 'addLocation',
            data: userCoords,
            headers: {
                'Content-Type': 'application/json',
            },
        });
       console.log("new location update is: ", newLocUpdate);
       return newLocUpdate;
    }catch(error){
       console.log("you have recived an error"); 
    }
}

// send a GET request to retrieve the user's most recent geolocation from db
const getCurrentLocation = async function(){
    try{
       const mostRecentLoc = await Axios({
            method: 'get',
            url: BASE_API_URL + 'getLocation',
            headers: {
                'Content-Type': 'application/json',
            },
        });
       console.log("users most recent location update is: ", mostRecentLoc);
       return mostRecentLoc;
    }catch(error){
       console.log("you have received an error. Could not get location update"); 
    }
}

addNewLocation();
getCurrentLocation();
exports.addNewLocation = addNewLocation;
exports.getCurrentLocation = getCurrentLocation;

