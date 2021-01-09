<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item>
                <h1 class="logo"> Covid Heroes</h1>
            </b-navbar-item>
        </template>
        
        <template slot="start">
            <b-navbar-item>
                <router-link 
                    to="/"> Home
                </router-link>
            </b-navbar-item>
            <b-navbar-item>
                <router-link 
                    to="/about"> About COVID-19
                </router-link>
            </b-navbar-item>
            <b-navbar-item>
                Data Analytics
            </b-navbar-item>
            <b-navbar-item>
                <router-link v-if="isLoggedIn"
                    to="/Dashboard"> Dashboard
                </router-link> 
            </b-navbar-item>
            <b-navbar-item>
                <router-link v-if="isLoggedIn"
                    to="/Profile"> Profile
                </router-link> 
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item>
                <div class="buttons">
                    <b-button v-if="!isLoggedIn" type="is-primary" @click="setSignupForm();modalOn();">
                        <strong>Sign up</strong>
                    </b-button>
                    <b-button v-if="!isLoggedIn" @click="setLoginForm();modalOn()">
                        <strong>Login</strong>
                    </b-button>
                      <b-button v-if="isLoggedIn" @click="logout()">
                        <strong>Logout</strong>
                    </b-button>
                </div>
                <Modal :title="modalTitle" :isActive="isModalActive" :submit="submitRegister" :offFunc="modalOff" ref="myModal">
                    <component :is="modalForm"/> 
                </Modal>
            </b-navbar-item>
        </template>
        
        
    </b-navbar>
</template>

<script>
import Modal from '@/components/Modal.vue'
import signupForm from '@/components/signupForm.vue'
import loginForm from '@/components/loginForm.vue'
const Axios = require('axios');
export default {
      name: 'Navigation',
      components: {
            Modal,
            signupForm,
            loginForm
      },
      data() {
            return {
                modalTitle: "Signup to CovidHeroes",
                modalForm: "",
                isModalActive: false,
            };
      },
      computed: {
            isLoggedIn: function() {
                console.log("Is logged in: ", this.$store.getters.isLoggedIn);
                return this.$store.getters.isLoggedIn;
            }
      },
       methods: {
           toggleIsModalActive() {
                this.isModalActive = !this.isModalActive;
            },
            modalOff(){
                this.isModalActive=false;
            },
            modalOn(){
                this.isModalActive=true;
            },
            submitRegister(){
                //console.log(this.$refs.myModal);
                //console.log(this.$refs.myModal.$slots.default[0]);
               // console.log(this.$refs.myModal.currentForm);
               this.$refs.myModal.$slots.default[0].componentInstance.submitUserData();
               this.modalOff();
                
            },
             setSignupForm() {
                this.modalForm = "signupForm";
            },
             setLoginForm() {
                this.modalForm = "loginForm";
            },
            async logout() {
                Axios.defaults.headers.common['Authorization'] = '';
                await this.$store.dispatch('logout');
                this.$router.push('/');
            }
      }
}
</script>
<style>
.logo{
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Comic Sans';
 }
</style>
