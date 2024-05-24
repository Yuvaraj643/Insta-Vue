<template>
  <div v-show="!loaderActive" class="user-details-container">
    <div
      class="user-details-wrapper"
      :class="{ 'animate-scroll': animateScroll }"
    >
      <img class="left" src="../assets/left.svg" @:click="scrollPrev" />

      <div
        class="user-details"
        v-for="(user, index) in visibleUsers"
        :key="index"
      >
        <main @click="$router.push(`/profile/${user._id}`)">
          <img :src="user.pic" class="user-logo" alt="logo" />
          <p>{{ user.name }}</p>
        </main>
      </div>
      <img class="right" src="../assets/right.svg" @:click="scrollNext" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      visibleUsers: [],
      currentIndex: 0,
      itemsPerScroll: 1,
    };
  },
  components: {},
  mounted() {
    fetch("https://instagram-server-bye5.onrender.com/all-users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.users = response.users;
      });
    this.initializeVisibleUsers();
    setInterval(this.scrollNext, 3000);
  },

  methods: {
    initializeVisibleUsers() {
      this.visibleUsers = this.users.slice(
        this.currentIndex,
        this.currentIndex + this.itemsPerScroll
      );
    },
    scrollNext() {
      this.currentIndex += this.itemsPerScroll;
      if (this.currentIndex >= this.users.length) {
        this.currentIndex = 0;
      }
      this.initializeVisibleUsers();
    },
    scrollPrev() {
      this.currentIndex -= this.itemsPerScroll;
      if (this.currentIndex < 0) {
        this.currentIndex = this.users.length - this.itemsPerScroll;
      }
      this.initializeVisibleUsers();
    },
  },
};
</script>

<style scoped>
.user-details-container {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.user-details main {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  cursor: pointer;  
}

main img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user-details-wrapper {
  position: relative;
  display: flex;
  white-space: nowrap;
  transition: transform 1s ease-in-out;
  border: 1px solid rgb(212, 173, 212);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 40px;
  /* width: 200px; */
  width: 29%;
  justify-content: space-around;
}
/* add slow animation */
.user-details-wrapper  {
  transition: transform 0.5s ease-in-out;
}


.user-details {
  flex: 0 0 auto;
}

.user-logo {
  max-width: 100px;
  max-height: 100px;
}

.right,
.left {
  width: 35px;
  cursor: pointer;
}

.left {
  position: absolute;
  left: -40px;
  top: 35%;
}

.right {
  position: absolute;
  right: -40px;
  top: 35%;
}
/* Responsive Styles */

@media (max-width: 768px) {
  .user-details-container {
    width: 100%;
  }

  .user-details-wrapper {
    width: 80%;
  }
}
</style>
