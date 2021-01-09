<template>
    <div>
       <div>
            <button v-on:click="isModal=true" > Click me!</button>
       </div>
        <div v-if="isModal">
            <div class="modal">
               <div class="modal-content">
                    <div class="box">
                        <div class="content">
                            <h3> Hi </h3>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    </div>
    
    
    
    
</template>






<script>
    export default {
        name: 'AddMissionRequest',
        data:()=>{
            return{
                isModal: false
            }
        
        
        }
    }

    
</script>





<style>



</style>
