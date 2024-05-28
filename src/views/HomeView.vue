<template>

    <Nav />
    <Loader />
    <Home />
    


</template>




<script>
import Nav from '@/components/Nav.vue';
import Loader from '@/components/Child-Components/Loader.vue';
import Home from '../components/Home.vue'
export default {
  components: {
    Nav,
    Loader,
    Home
  },
}



</script>


<style scoped>





</style>
