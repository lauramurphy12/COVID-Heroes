<template>
     <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
</template>

<style>


</style>
<script>
    import Mapbox from "mapbox-gl";
    import { MglMap } from "vue-mapbox";

    export default {
        name: "map",
        components: {
            MglMap
        },
        data:()=>{
            return {
                accessToken: "pk.eyJ1IjoibWluZzEwMTQzIiwiYSI6ImNrOTJoeXdmdjA0bW0zb3J0amh3MHhiZGQifQ.ZzgMDP2QjqbHfFveAF_g8w", // your access token. Needed if you using Mapbox maps
                mapStyle: "Light" // your map style
            };
        },
       created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox;
        }
        
    };
</script>

