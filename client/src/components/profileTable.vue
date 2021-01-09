<template>
    <b-table :data= {{ tableData }} :columns= {{ tableColumns }} ></b-table>
</template>
<script>
export default{
    name: 'profileTable',
   //components: {
    //      
    //},
    props: {
        tableData: String,
        tableColumns: String
    }
}
</script>

<style>
</style>
