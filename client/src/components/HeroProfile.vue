     
<template>
 <div class="tile is-ancestor">
        <div class="tile is-6 is-vertical is-parent">
            <div class="tile is-child box">
                <p class="title">Edit Profile</p>
                <div class="box">
                    <div class="content">
                       <editProfile/>
                    </div>
                </div>
            </div>
            <!--<div class="box">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                              <font-awesome-icon icon="user" size="3x" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p class="title"> Account Details</p>
                        </div>
                    </div>
                </article>
            </div> -->
        </div> 
        <div class="tile is-6 is-vertical is-parent">
            <div class="tile is-child box">
                <ActiveMissionCard/>
            </div>
            <div class="tile is-child box">  
               <AllMissionsCard/>
            </div>
        </div>
    </div>
</template>

<script>
import editProfile from '@/components/editProfile.vue'
export default{
    name: 'HeroProfile',
    components: {
       //AllResponsesCard,
       //ActiveResponseCard,
       editProfile
    },
   // data() {
    //    return {
      //     cardContent: 
       // };
    //},
   // created() {
           

        
        
   //},*/
   
}
</script>

<style>

</style>

