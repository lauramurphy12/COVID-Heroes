<template>
    <div>
        <mapContainer :coordinates="coordinatesA"/>
    </div>
</template>


<script>
import mapContainer from '@/components/mapContainer.vue'
const secrets = require('../../secrets.json');

export default{
    name: 'HeroBoard',
      components: {
            mapContainer,
      },
          data() {
            return {
                accessToken: secrets.mapbox.accessToken, // get access token from secrets.json
                mapStyle: "mapbox://styles/mapbox/streets-v9", // your map style
                coordinatesA: [
                    { id: "1", lat:-74.0868, log:41.7476},
                    { id: "2", lat:-75.0868, log:42.7476},
                    { id: "3", lat:-76.0868, log:43.7476},
                    { id: "4", lat:-77.0868, log:44.7476},
                ],    
            };
        },
        created() {
            this.$getLocation()
            .then(coordinates => {
                console.log(coordinates);
            });

        
        
        },
     //  methods: {
      //     toggleIsModalActive() {
      //          this.isModalActive = !this.isModalActive;
      //      }
      //}
}
</script>

<style>

</style>
