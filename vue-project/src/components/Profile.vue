<template>
  <Loader :active="loaderActive" />
  <section v-show="!loaderActive">
    <main>
      <div>
        <img :src="pic" alt="logo" />
      </div>
      <div class="user-details">
        <h2 class="username" v-for="data in UserData" :key="data.id">
          {{ data.name }}
        </h2>
        <div class="follow-section">
          <button @:click="follow">Follow</button>
        </div>
        <span class="label-section">
          <span>
            <p>Posts</p>
            <p v-for="data in UserData" :key="data.id">{{ data.length }}</p>
          </span>
          <span>
            <p>Followers</p>
            <p>{{ followers }}</p>
          </span>
          <span>
            <p>Following</p>
            <p>{{ following }}</p>
          </span>
        </span>
        <span> </span>
      </div>
      <!-- <p >{{ data.followers.length }}</p> -->
    </main>
    <br />
    <hr />
    <section id="main-post">
      <post
        id="main-post-section"
        class="user-posts"
        v-for="post in Userposts"
        :key="post.id"
      >
        <section>
          <img class="main-post" :src="post.photo" alt="logo" />
        </section>
        <div class="post-details">
          <div class="int-section">
            <img
              v-if="post.likes.includes(id)"
              @:click="unlikePost(post._id)"
              src="./assets/like.svg"
              class="like-image"
              alt="like"
            />
            <img
              v-else
              src="./assets/!like.svg"
              @:click="likePost(post._id)"
              class="like-image"
              alt="unlike"
            />
            <img src="./assets/comment.svg" class="like-image" alt="comment" />
          </div>
          <div class="post-desc">
            <p>{{ post.likes.length }} Likes</p>
            <span class="comment-section">
              <input
                ref="comment"
                type="text"
                class="comment-input"
                v-model="text"
                placeholder="Add a comment..."
                @keyup.enter="commentPost(text, post._id)"
              />
            </span>
            <!-- <p>{{ post.comments.length }} Comments</p> -->
          </div>
        </div>
      </post>
    </section>
  </section>
</template>

<script>
import Loader from "./Child-Components/Loader.vue";

export default {
  data() {
    return {
      Userposts: null,
      UserData: null,
      id: this.$route.params.id,
      // user: JSON.parse(localStorage.getItem("user")),
      // pic: JSON.parse(localStorage.getItem("user")).pic,
      // name: JSON.parse(localStorage.getItem("user")).name,
      // name : null,
      pic: "",
      followers: null,
      following: null,
      loaderActive: false,
    };
  },
  methods: {
    hideLoader() {
      this.loaderActive = false;
    },
    showLoader() {
      this.loaderActive = true;
    },
  },
  mounted() {
    this.showLoader();
    fetch(`https://instagram-83t5.onrender.com/user/${this.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          console.log(response);
          this.UserData = response;
          this.Userposts = response.posts;
          this.pic = response.user.pic;
          if (response.user.followers.length == 0) {
            this.followers = 0;
          } else {
            this.followers = response.user.followers.length;
          }
          if (response.user.following.length == 0) {
            this.following = 0;
          } else {
            this.following = response.user.following.length;
          }
          this.hideLoader();
        }, 2000);
      });
  },
  components: {
    Loader,
  },
  provide() {
    return {
      token: localStorage.getItem("token"),
    };
  },
};
</script>

<style scoped>
#main-post {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#main-post-section {
  border-radius: 25px;
  padding: 10px;
  margin: 10px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.comment-section {
  display: flex;
  align-items: center;
  /* gap: 10px; */
}

.comment-section1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-input {
  width: 85%;
  height: 30px;
  margin-bottom: 15px;
  border-radius: 15px;
  border: 2px solid rgb(121, 120, 202);
  padding: 5px 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
main {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  margin: 0 auto;
  max-width: 60%;
  padding: 25px;
  border-radius: 20px;
  display: flex;
}

main div img {
  width: 80%;
  height: 100%;
  border-radius: 55%;
}
.user-details {
  width: 100%;
}
.user-details h2 {
  width: 100%;
  text-align: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.username {
  font-size: 25px;
  text-align: center;
}

.label-section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  margin-left: 20px;
  margin-top: 50px;
}

.label-section p {
  font-size: 18px;
  text-align: center;
}

.follow-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
}

.follow-section button {
  border-radius: 10px;
  border: 1px solid rgb(255, 255, 255);
  background-color: rgb(136, 38, 110);
  color: white;
  cursor: pointer;
  font-size: 15px;
  padding: 10px 30px;
}
post {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* post section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
} */

post img {
  width: 350px;
  height: 500px;
  border-radius: 20px;
  margin: 20px;
}

.post-details {
  width: 350px;
  padding-left: 10px;
  margin-left: 10px;
}

.user-posts {
  display: flex;
}

.like-image {
  width: 40px;
  height: 40px;
  margin: 0px 5px;
}

.post-desc p,
input {
  margin: 2px;
  margin-left: 10px;
}

/* Responsive Styles */

@media (max-width: 768px) {
  main,
  main div {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .user-details h2 {
    margin: 10px;
  }
  #main-post{
    width: 95%;
    padding: 0px;
    padding: 15px;

    margin: 0px auto
  }

  .main-post{
    width: 98%;
    margin: 0px;
    padding: 5px;
    /* margin: 0 auto; */
  }

  #main-post-section{
    width: 100%;
    padding: 2px;
  }
.comment-input{
  width: 70%;
  margin-bottom: 15px;
}
.post-details{
  width: 100%;
  /* padding-left: 45px ; */
}
}
</style>
