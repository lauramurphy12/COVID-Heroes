const Axios = require('axios');
const BASE_API_URL = 'http://localhost:4000/auth/';

//send a POST request to register for an account
const register = async function(registerArgs){
    try{
       const response = await Axios({
            method: 'post',
            url: BASE_API_URL + 'signup',
            data: registerArgs,
            headers: {'Content-Type': 'application/json'},
        });
        return response;
    }catch(error){
       console.log("Could not receive a response", error);
    }
}
//send a POST request to login to account
const login = async function(loginCredentials){
    try{
        const response = await Axios({
            method: 'post',
            url: BASE_API_URL + 'login',
            data: loginCredentials,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log("response: ", response);
        return response;
    }catch(error){
         console.log("Could not receive a response", error);
    }

}
//send a PUT request to update user details
const updateAccount = async function(updateArgs){
     try{
       const updateAccount = await Axios({
            method: 'put',
            url: BASE_API_URL + 'update',
            data: updateArgs,
            headers: {
                'Content-Type': 'application/json',
            },
        });
       return updateAccount;
    }catch(error){
       console.log("error"); 
    }
}

register();
login();
updateAccount();
exports.register = register;
exports.login = login;
exports.updateAccount = updateAccount;



/*
const profile = async function(){
    try{
       const res = await Axios({
            method: 'get',
            url: BASE_API_URL + 'profile',
            headers: authHeader() ,
        });
         console.log("Response is as follows", res);
         
    }catch(error){
       console.log("Could not receive a response", error); 
    }
   // parsed = res.data;
   // console.log(parsed);
}

/*
const getUserByPk = async function(){
    let res = await Axios.get('http://localhost:4000/users/1');
    parsed = res.data;
    console.log(parsed);
}

*/
