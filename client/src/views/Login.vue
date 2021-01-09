<template>
    <div>
        <Modal :title="modalTitle" @submit="login">
            <component :is="modalForm"/>
        </Modal>
   </div>
</template>


<script>
import loginForm from '@/components/loginForm.vue'
import Modal from '@/components/Modal.vue'
export default{
    name: 'Login',
    components: {
        loginForm,
        Modal,
    },
    data (){
        return {
            modalForm: "loginForm",
            modalTitle: " Login",
        }
    },
    methods: {
        register () {
            this.$refs.modalForm.authenticate();
        }
    },
}
</script>
