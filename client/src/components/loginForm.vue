<template>
    <form action="">
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
        <b-button @click="authenticate">Login!</b-button>
    </form>
</template>


<script>
    export default{
        name: "loginForm",
        data (){
            return {
                user: {
                    username: "",
                    password: ""
                },
            }
        },
        methods: {
            async authenticate(){
                var login = {
                    username: this.user.username,
                    password: this.user.password
                };
                try{
                    var loginCredentials = JSON.stringify(login);
                    await this.$store.dispatch('login', loginCredentials);
                    this.$router.push('/Profile');
                }catch(e){
                    console.log(e);
                }
            
            }
        }
}
</script>

<style>

</style>


