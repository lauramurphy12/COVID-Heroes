<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title"> {{titleHeader}}</p>
        </header>
        <div class="card-content">
            <div class="content">
                 <b-table :data={{tableData}} :columns={{tableAttributes}}></b-table>  
            </div>
        </div>
        <footer class="card-footer">
            <b-button  @click="" type="is-info"> {{buttonLabel}}</b-button>
        </footer>
    </div>
</template>


<script>
    export default {
    name: 'profileCard',
      data() {
           return {
        
           };
       },  
        props: {
           //dbRequest: Function,
           tableData: Array,
           titleHeader: String,
           buttonLabel: String,
           tableAttributes: Array
        },

    }
</script>

<style>
  
</style>
