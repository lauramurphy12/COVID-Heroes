<template>
    <HeroResponses :title="modalTitle">
            <component :is="modalForm"/>
        </Modal>
</template>

<script>
//import updateMissionForm from '@/components/updateMissionForm.vue'
//import postService from '../../services/postService';
export default{
    name: 'HeroResponses',
   components: {
            card
    },
    data() {
        return {
            tableData: [],
            tableAttributes: [
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
            ],
            tableHeader: "Most Recent Responses"
        }
    },
    /*
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
    }*/
}
</script>

<style>
</style>
