import authService from '../../services/authService';
const jwt = require("jsonwebtoken");
const Axios = require('axios');

export const authModule = {
    state: {
        status: '',
        token: localStorage.getItem('token') || '', 
    },
    actions: {
        async login({commit}, user) {
            try{
                const response = await authService.login(user);
                console.log("Response is after authService login call: ", response);
                const jwtToken = response.data.token;
                console.log("json web token is: ", jwtToken);
                localStorage.setItem('token', jwtToken);
                Axios.defaults.headers.common['Authorization'] = jwtToken;
                commit('loginSuccess', jwtToken);
            }catch(error){
                commit('login_failure');
            }
        },
        async register({commit}, user) {
             const response = await authService.register(user); 
             console.log(response);
             if(response){
                 if(response.message!='Failed to insert'){
                      commit('register_failure');
                 }
                 commit('register_success');
             }
            else{
                commit('register_failure');
            }
        },
       async logout({commit}) {
           localStorage.removeItem('token');
           commit('logout');
       }
    },
    mutations: {
        loginSuccess(state, token) {
            state.status = 'login success';
            state.token = token;
        },
        login_failure(state){
            state.status = 'login failure';
        },
        register_success(state){
            state.status = 'register success';
        },
        register_failure(state){
            state.status = 'register failure';
        },
        logout(state){
            state.status = 'logout';
            state.token = '';
        }
    },
    getters: {
        //isLoggedIn: state => state.token ? {isLoggedIn:true}: {isLoggedIn:false},
        isLoggedIn: (state) => { return !!state.token},
        authStatus: (state) => { return state.status},
        userData: (state) => {
            let out = JSON.stringify({username:"Bad user"});
            try{
                let d = (jwt.decode(state.token)).user;
                console.log(d);
                out = (JSON.stringify(d));
            }catch(e){
                console.log("auth module userData getter");
                console.log(e);
            }
            console.log(out);
            return out;
        }
    }
};
