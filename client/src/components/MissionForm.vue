<template>
    <form action="">
                <b-field label="Mission Title">
                    <b-input
                        :value="title"
                        placeholder="Your Mission Title"
                        v-model="mission.title"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Description of Mission"
                :label-position="labelPosition">
                    <b-input
                         maxlength="200" 
                         type="textarea"
                        :value="description"
                        v-model="mission.description"
                        required
                        >
                    </b-input>
                </b-field>
                <b-button @click="submitPost">Submit</b-button>
<!--
                <b-field label="Select datetime">
                    <b-datetimepicker 
                        v-model="datetime"
                        inline
                        placeholder="Type or select a date..."
                        editable>
                    </b-datetimepicker>
                </b-field> -->
    </form>
</template>


<script>
import postService from '../../services/postService';
import mapService from '../../services/mapService';
    export default{
        name: "MissionForm",
        data (){
            return {
                mission: {
                    title: "",
                    description: ""
                },
            }
        },
    
      methods: {
            async submitPost(){
                var postContents = {
                    title: this.mission.title,
                    description: this.mission.description
                };
                try{
                    var postSubmission = JSON.stringify(postContents);
                    const missionSubmission = await postService.addMissionPost(postSubmission);
                    console.log(missionSubmission);
                    if(missionSubmission!=null){
                        const currentGeolocation = await mapService.getCurrentLocation();
                        console.log("currentGeolocation data is: ", currentGeolocation.data);
                        console.log("current location of user is: ", currentGeolocation);
                    }
                }catch(e){
                    console.log(e);
                }
            
            }
        } 
    }
    
</script>



<style>

</style>
