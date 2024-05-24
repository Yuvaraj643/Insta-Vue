<template>
  <section>
    <Loader :active="loaderActive" />
    <section class="input-section">
      <input
        type="text"
        class="search"
        v-model="searchvalue"
        placeholder="Search User by Name"
        @:input="search(searchvalue)"
      />
    </section>
    <section>
      <User v-show="!loaderActive" :posts="responseData" />
      <NewPost
        v-show="!loaderActive"
        :posts="responseData"
        :search="searchvalue"
      />
    </section>
  </section>
</template>

<script>
import NewPost from "./Child-Components/New-Post.vue";
import Loader from "./Child-Components/Loader.vue";
import User from "./Child-Components/User.vue";
export default {
  data() {
    return {
      loaderActive: false,
      responseData: null,
      searchvalue: "",
    };
  },
  methods: {
    hideLoader() {
      this.loaderActive = false;
    },
    showLoader() {
      this.loaderActive = true;
    },
    search(searchvalue) {
      this.showLoader();
      fetch("https://instagram-server-bye5.onrender.com/all-posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setTimeout(() => {
            const filteredPosts = response.posts.filter((post) => {
              return post.postedBy.name.includes(this.searchvalue);
            });
            if (filteredPosts.length == 0) {
              this.$toast.error("No posts found for this search");
            }
            this.responseData = filteredPosts;
            // console.log(filteredPosts);
            this.hideLoader();
          }, 1000);
        });
    },
  },
  components: {
    NewPost,
    Loader,
    User,
  },
  mounted() {
    setTimeout(() => {
      window.location.reload();
    }, 1000000000);
    this.showLoader();
    fetch("https://instagram-server-bye5.onrender.com/all-posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          console.log(response.posts);
          this.responseData = response.posts;
        });
        this.hideLoader();
      }, 2000);
  },
};
</script>

<style scoped>
.search {
  width: 28%;
  height: 20px;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  left: 50%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.submit {
  height: 40px;
  width: 80px;
}
.input-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 550px) {
  .search {
    width: 75%;
  }
}
</style>
