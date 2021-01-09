<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title"> Active Mission </p>
        </header>
        <div class="card-content">
            <div class="content">
                 <b-table :data="activePost" :columns="activePostAttributes"></b-table>  
            </div>
        </div>
        <footer class="card-footer">
            <b-button  @click="retrieveActivePost" type="is-info"> View Mission </b-button>
        </footer>
    </div>
</template>

<script>
//import updateMissionForm from '@/components/updateMissionForm.vue'
import postService from '../../services/postService';
export default{
    name: 'ActiveMissionCard',
   components: {
       // updateMissionForm   
    },
    data() {
        return {
            activePost: [],
            activePostAttributes: [
                {
                    field: 'title',
                    label: 'Title',
                },
                {
                    field: 'description',
                    label: 'Description',
                },
                {
                    field: 'createdAt',
                    label: 'Created On',
                    centered: true
                }
            ]
        }
    },
    methods: {
        async retrieveActivePost() {
            
            try{
                const currentMission = await postService.getActivePost();
                console.log(currentMission);
                this.activePost.push(currentMission.data);
               // this.activePost.push(currentMission.entries(title));
                 //this.activePost.push(currentMission.data.description);
                 //this.activePost.push(currentMission.data.createdAt);
                console.log("active mission post is: ", this.activePost);
            }catch(e){
                console.log(e);
            }
        }
    }
  //  props: {
//        cardTitle: String,
  //      firstButton: String,
  //  }
}
</script>

<style>
</style>
