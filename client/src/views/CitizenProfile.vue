<template>
   <div>
        <Modal :title="modalTitle">
            <component :is="modalForm"/>
        </Modal>
   </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import MissionForm from '@/components/MissionForm.vue'
export default{
    name: 'CitizenProfile',
         components: {
            Modal,
            MissionForm,
         },
         data (){
            return {
                modalForm: "MissionForm",
                modalTitle: " Update Current Mission",
            }
         }
}

</script>






<style>




</style>
