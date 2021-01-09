<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title"> Recent Missions </p>
        </header>
        <div class="card-content">
            <div class="content">
               <b-table :data="missionPosts" :columns="missionPostAttributes"></b-table> 
            </div>
        </div>
        <footer class="card-footer">
            <b-button  @click="retrieveMissionPosts" type="is-info"> View Recent </b-button>
        </footer>
    </div>
</template>

<script>
//import updateMissionForm from '@/components/updateMissionForm.vue'
import postService from '../../services/postService';
export default{
    name: 'AllMissionsCard',
   components: {
    //    updateMissionForm   
    },
    data() {
        return {
            missionPosts: [],
            missionPostAttributes: [
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
        async retrieveMissionPosts() {
            try{
                const allMissions = await postService.getAllMissionPosts();
                console.log(allMissions.data);
                
                this.missionPosts = allMissions.data;
                console.log("missions posts are: ", this.missionPosts);
            }catch(e){
                console.log(e);
            }
        },
    }
   // props: {
  //      cardTitle: String,
  //      firstButton: String,
  //  }
}
</script>

<style>
</style>
