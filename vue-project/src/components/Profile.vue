<template>
  <section>
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
    <post>
      <section>

      </section>
    </post>
  </section>
</template>

<script>
export default {
  data() {
    return {
      Userposts: null,
      UserData: null,
      id: this.$route.params.id,
      user: JSON.parse(localStorage.getItem("user")),
      pic: JSON.parse(localStorage.getItem("user")).pic,
      name: JSON.parse(localStorage.getItem("user")).name,
      followers: null,
      following: null,
    };
  },
  methods: {
    
  },
  mounted() {
    fetch(`https://instagram-83t5.onrender.com/user/${this.user._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.UserData = response;
        this.Userposts = response.posts;
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
        // this.followers = response.user.followers
        // this.following = response.user.following
      });
  },
  components: {},
  provide() {
    return {
      token: localStorage.getItem("token"),
    };
  },
};
</script>

<style scoped>
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

/* Responsive Styles */

@media (max-width: 768px) {
  main,main div {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .user-details h2{
    margin: 10px;
  }

  
}
</style>
