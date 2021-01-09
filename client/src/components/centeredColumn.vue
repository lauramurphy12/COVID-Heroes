<template>
    <div class="columns is-vcentered">
        <div class="column">
        </div>
            
        <div class="column is-centered is-primary is-vcentered">
            <router-view/>
        </div>
        
        <div class="column">
        </div>
    </div>
</template>


<script>

export default{
    name: 'centeredColumn',
}
</script>

<style>
</style>
