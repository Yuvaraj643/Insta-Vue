<template>
    <section>
        <div class="main-post" v-for="post in posts" :key="post.id">
            <span class="user-details">
                <img v-bind:src="post.postedBy.pic" class="user-logo" alt="logo">
                  <p class="user-name">{{post.postedBy.name}}</p>
            </span>
            <img :src="post.photo" alt="logo" class="post-image" />
            <span class="int-section">
              <img v-if="post.likes.includes(id)"   @:click="unlikePost(post._id)"   src="../assets/like.svg" class="like-image" alt="like" />
              <img v-else src="../assets/!like.svg" @:click="likePost(post._id)" class="like-image" alt="unlike" />
              <img src="../assets/comment.svg"      @:click="Comments(post._id)"  class="like-image" alt="comment" />
            </span>
            <span class="post-desc">
            <p>{{ post.likes.length }} Likes</p>
            <p>{{ post.body }}</p>
          </span>
        </div>
    </section>
  </template>
<script>

export default{
    data(){
        return{
          id : localStorage.getItem('id'),
        }
    },
    methods:{
      likePost(id){
        fetch('https://instagram-83t5.onrender.com/like', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + localStorage.getItem('token'),
          },
          body: JSON.stringify({
            postId : id
          })
        }).then((response) => response.json())
        .then((response) => {
          console.log(response);

        })
      },
    unlikePost(id){
      fetch('https://instagram-83t5.onrender.com/unlike', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          postId : id
        })
      }).then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
    },
    
  },

    components:{
        Function
    },
    props:{
        posts : {
        type: Array,
        required : true
      }
    }
}

</script>


<style scoped>

.like-image{
  width: 30px;
  height: 30px;
}
section{
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.main-post{ 
  width: 500px;
  margin: 15px auto;
  border-radius: 15px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.post-image{
  width: 100%;
  height: 500px;
  border-radius: 10px;

}
.user-name{
  font-size: 18px;
  font-weight: 550;
}
.user-details{
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 15px;
  padding: 5px 5px;
}

.user-logo{
  width: 60px;
  height: 50px;
  border : 1px solid black;
  border-radius: 50%;
  background-position: center;
  background-image: cove;
}

.int-section{
  padding: 2px;
  display: flex;
  align-items: center;
  gap: 10px;  
}

.post-desc p{
  padding-left: 8px;
  font-size: 16px;
}


</style>
