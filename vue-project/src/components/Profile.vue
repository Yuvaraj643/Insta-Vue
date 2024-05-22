<template>
  <section>
    <main >
      <div>
        <img :src="pic" alt="logo" />
      </div>
      <div class="user-details">
        <h2 class="username" v-for="data in UserData" :key="data.id">{{ data.name }}</h2>
        <span class="label-section">
            <p>Posts</p>
            <p>Followers</p>
            <p>Following</p>
        </span>
        <span>
            <p v-for="data in UserData" :key="data.id">{{ data.length }}</p>
        </span>
      </div>
      <!-- <p >{{ data.followers.length }}</p> -->
    </main>
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
      followers: JSON.parse(localStorage.getItem("user")).followers,
      following: JSON.parse(localStorage.getItem("user")).following,
    };
  },
  methods: {},
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
        localStorage.setItem("followers", response.user.followers);
        console.log("followers", response.user.followers)

      });
  },
  components: {
    
  },
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
  width: 60%;
  margin: 0px 0px 0px 125px;
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

.username{
    font-size: 30px;
}

.label-section{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
}

.label-section p{
    font-size: 28px;
}
</style>
