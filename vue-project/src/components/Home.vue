<template>
    <section>
      <!-- <Nav /> -->
      <section v-for="post in responseData" :key="post.id">
        <NewPost :posts="responseData"/>
      </section>
    </section>
</template>

<script>
import Nav from './Nav.vue';
import NewPost from './Child-Components/New-Post.vue';
export default{
    data(){
        return{
          responseData : null
        }
    },
    components: {
        Nav,
        NewPost,
    },
    provide(){
    return{
      token : localStorage.getItem('token')
    }
  },
  inject:[
    'token'
  ],
  mounted(){
    console.log("mounted");
    fetch('https://instagram-83t5.onrender.com/all-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : "Bearer " + localStorage.getItem('token'),
      }
    }).then((response) => response.json())
      .then((response) => {
        console.log(response.posts);
        this.responseData = response.posts
      }
    )
  },

}
</script>

<style>

</style>