<template>
    <div>
        <section>
            <b-notification :closable="false">
                <p class="title"> Welcome {{ user.firstName }} !</p>
                <b-loading :active.sync="isLoading"></b-loading>
            </b-notification>
        </section>
        <component v-bind:is="profileType"/>
    </div>
</template>



<script>
import CitizenProfile from '@/components/CitizenProfile.vue'
import HeroProfile from '@/components/HeroProfile.vue'

export default {
    name: 'Profile',
    components: {
        CitizenProfile,
        HeroProfile
    },
    data (){
        return {
            isLoading: true,
            user: {
                firstName: "...",
            },
            profileType: ""
        };
           // profileTypes: { citizen: "../../CitizenProfile.vue", hero:"../../HeroProfile.vue"],
            //currentProfileType: ()=>{
            //    if(!this.user){
            //        return this.profileTypes[0];
            //    }
            //    return this.profileTypes[this.user.userType];
           // },
    },
    methods: {
        
        fetchUser: async function() {
            this.$data.user = JSON.parse(await this.$store.getters.userData);
            if(this.$data.user.userType == "citizen"){
                this.profileType = "CitizenProfile"
            }else if(this.$data.user.userType == "hero"){
                this.profileType = "HeroProfile"
            }else{
                this.$router.push("/");
            }
            this.$data.isLoading = false;
            return this.$data.user;
        }
    },
    mounted: function(){
        this.$nextTick(()=>{this.fetchUser();});
        console.log("Mounted.");
    },
} 
</script>














