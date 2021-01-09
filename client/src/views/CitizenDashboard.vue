<template>
    <div>
        <mapContainer :coordinates="coordinatesA"/>
        <button id="add" class="delete is-danger is-large"
        @click="isComponentModalActive = true">
        </button>
        <Modal :title="modalTitle">
            <component :is="modalForm"/>
        </Modal>
    </div>
</template>


<script>
import mapContainer from '@/components/mapContainer.vue'
import Modal from '@/components/Modal.vue'
import MissionForm from '@/components/MissionForm.vue'
const secrets = require('../../secrets.json');

export default{
    name: 'CitizenDashboard',
      components: {
            mapContainer,
            Modal,
            MissionForm,
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
                modalTitle: "Submit New Mission",
                modalForm: "MissionForm",
                
            };
        },
}
</script>

<style>
  #add{
    position: fixed;
    bottom: 0px;
    right: 0px;
    margin: 90px;
    transform: rotate(45deg) scale(3.75);
 }
</style>
