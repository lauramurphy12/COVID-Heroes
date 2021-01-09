<template>
    <form action="">
        <b-field label="FirstName">
            <b-input
                :value="user.firstName"
                placeholder="First Name"
                required
                v-model="user.firstName">
            </b-input>
        </b-field>
          <b-field label="LastName">
            <b-input
                placeholder="Last Name"
                required
                v-model="user.lastName">
            </b-input>
        </b-field>
        <b-field label="email"
            type="is-danger">
            <b-input 
                type="email"
                placeholder="email"
                required
                v-model="user.email">
            </b-input>
        </b-field>
         <b-field label="username"
            type="is-success">
            <b-input
                placeholder="username"
                required
                v-model="user.username">
            </b-input>
        </b-field>
        <b-field label="password"
            type="is-warning">
            <b-input  
                type="password" 
                placeholder="password"
                required
                v-model="user.password">
            </b-input>
        </b-field>
        <b-field label="Who Are You?">
            <b-select placeholder="Select a user type" v-model="user.userType">
                <option value="1">Citizen</option>
                <option value="2">Hero</option>
            </b-select>
        </b-field>
    
    </form>
</template>


<script>
    export default{
        name: "signupForm",
        data (){
            return {
                user: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: "",
                    userType: "",
                },
            }
        },
        methods: {
            async submitUserData(){
                var userData = {
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    username: this.user.username,
                    password: this.user.password,
                    userType: this.user.userType
                };
                /*
                if(userData.firstName == 'test'){
                    const Axios = require('axios');
                    const BASE_API_URL = 'http://localhost:4000/auth/';

                    try{
                        const response = await Axios({
                            method: 'get',
                            url: BASE_API_URL + 'testAllUser'
                        });
                        console.log("response: ", response);
                    }catch(error){
                        console.log("Could not receive a response", error);
                    }
                    return;
                }*/
                try{
                    var userJSON = JSON.stringify(userData);
                    await this.$store.dispatch('register', userJSON);
                    let results = this.$store.state.status;
                    if(results == "register success"){
                        this.$router.push('/Home');
                    }
                }catch(e){
                    console.log(e);
                }
            }
        }
    }
    //    <b-button @click="submitUserData">Signup</b-button>

</script>

<style>

</style>
