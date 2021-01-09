<template>
    <div id="app">
        <Navigation />
        <router-view/> 
    </div>
</template>

 <script>

import Navigation from './components/Navigation'

export default{
    name: 'app',
    components:{
        'Navigation': Navigation
    },
    data(){
        return {
            contentMinWidth:false,
        }
    }
}
//in css
//@import 'https://cdnjs.cloudflare.com/ajax/libs/buefy/0.8.20/buefy.min.js';

</script>

<style lang="scss">
@import "./assets/sass/covh-styles.scss";
</style>
