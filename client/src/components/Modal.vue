<template>
    <div>
        <b-modal :active.sync="isActive"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="false"
                 aria-role="dialog"
                 :on-cancel="modalOff"
                 aria-modal
                 ref="bmod">
                 
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title"> {{title}} </p>
                </header>
            
                <section class="modal-card-body">
                    <slot ref="form"/>
                </section>
            
                <footer class="modal-card-foot">
                    <button class="button is-info" type="button" @click="submit">Submit</button>
                    <button class="button" type="button" @click="modalOff">Close</button>
                </footer>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
    name: 'Modal',
      data() {
           return {
                currentForm:this.$refs.form
           };
       },  
        props: {
            title: String,
            isActive: Boolean,
            submit: Function,
            offFunc: Function,
        },
        methods: {
           modalOff() {
                //this.$refs.bmod.active = false;
                this.offFunc();
                
            },
            forceUpd(){
                this.$forceUpdate();
                return;
            }
      }
    }
</script>

<style>
  
</style>
   
   
    
    
    
    
    
    









