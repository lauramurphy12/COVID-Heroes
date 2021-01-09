<template>
   <div>
        <Modal :title="modalTitle" @submit="register">
            <component :is="modalForm"/>
        </Modal>
   </div>
</template>


<script>
import signupForm from '@/components/signupForm.vue'
import Modal from '@/components/Modal.vue'
export default{
    name: 'Signup',
    components: {
        signupForm,
        Modal,
    },
    data (){
        return {
            modalForm: "signupForm",
            modalTitle: " Signup",
        }
    },
    methods: {
        register () {
            this.$refs.modalForm.submitUserData();
        }
    },
}
</script>
