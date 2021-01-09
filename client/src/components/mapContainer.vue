<template>
    <div>
        <MglMap id="m" ref="map" :accessToken="accessToken" :mapStyle="mapStyle" @load="onMapLoad">
         <!--  <MglGeolocateControl position="top-right" trackUserLocation="true"/> -->
           <MglMarker v-for="coordinate in coordinates" :key="coordinate.id" color="blue" :coordinates="[coordinate.lat,coordinate.log]">
                <template slot="marker">
                     <font-awesome-icon icon="head-side-mask" size="3x" />
                </template>
           </MglMarker>
        </MglMap>
    </div>
</template>

<style>
#m{
    height:100%;
    position:absolute;
    z-index:-1 !important;
}
#b{
    z-index:1;
}
</style>
<script>
    import Mapbox from "mapbox-gl";
    import {MglMap,MglMarker} from 'vue-mapbox';
    import mapService from '../../services/mapService';
    const secrets = require('../../secrets.json');
    
    export default {
        name: "mapContainer",
        components: {
            MglMap,
            MglMarker,
        },
        data() {
            return {
                accessToken: secrets.mapbox.accessToken, // get access token from secrets.json
                mapStyle: "mapbox://styles/mapbox/streets-v9", // your map style
                latitude:  null,
                longitude: null
            };
        },
        props: ["coordinates"],
        
       created() {
            //this.$refs.map = Mapbox;
            this.Mapbox = Mapbox;
            this.map = null;
        },
         methods: {
            async getUserLocation(){
                return new Promise((resolve, reject) => {
                    if("geolocation" in navigator){
                         navigator.geolocation.getCurrentPosition(position => {
                            resolve(position.coords);
                          }, error => {
                           reject(error);
                         });
                    }
                    else{
                        reject(new Error("Geolocation is not available"));
                    }
                });
            },
            async setCurrentPosition(){
               const userCoordinates = [];
                try{
                    var currentUserPos = await this.getUserLocation();
                    this.longitude = new Number(currentUserPos.longitude);
                    this.latitude = new Number(currentUserPos.latitude);
                    userCoordinates[0] = this.longitude;
                    userCoordinates[1] = this.latitude;
                    console.log("userCoordinates are: ", userCoordinates);
                    var coordinates = {
                        longitude: userCoordinates[0],
                        latitude: userCoordinates[1],
                    }
                    //console.log("Point is: ", point);
                      var geoLocation = JSON.stringify(coordinates);
                    const storeLocation = await mapService.addNewLocation(geoLocation);
                    console.log("storeLocation is: ", storeLocation);
                }catch(error){
                    console.log(error);
                }
            },
            
 
            async onMapLoad (event) {
                this.map = event.map;
                
               await this.setCurrentPosition();

                const asyncActions = event.component.actions;

                const newParams = await asyncActions.flyTo({
                    center: [this.longitude, this.latitude],
                    zoom: 7,
                    speed: 1,
                });
                
                console.log(newParams)
            },
            
        },
            

    };

</script>

