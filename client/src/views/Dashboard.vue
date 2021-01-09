<template>
    <div>
      <component v-bind:is="userDashboard"/>
    </div>
</template>


<script>
import CitizenBoard from '@/components/CitizenBoard.vue'
import HeroBoard from '@/components/HeroBoard.vue'
//const secrets = require('../../secrets.json');

export default{
    name: 'Dashboard',
      components: {
            CitizenBoard,
            HeroBoard
      },
          data() {
            return {
                userDashboard: ""
            };
        },
        /*
        created() {
            this.$getLocation()
            .then(coordinates => {
                console.log(coordinates);
            });

        
        
        }, */
       methods: {
           fetchUserRole: async function () {
                this.$data.user = JSON.parse(await this.$store.getters.userData);
                //this.$data.isLoading = false;
                if(this.$data.user.userType == 'citizen'){
                    this.userDashboard = 'CitizenBoard';
                }else{
                    this.userDashboard = 'HeroBoard';
                }
                return this.$data.user.userType;
            }
      },
        mounted: function(){
        this.$nextTick(()=>{this.fetchUserRole();});
        console.log("Fetched user role.");
    },
}
</script>

<style>

</style>
