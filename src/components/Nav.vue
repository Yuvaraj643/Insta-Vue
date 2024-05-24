<template>
    <div>
      <nav>
        <img
          src="./components/assets/logo.png"
          @click="$router.push('/home')"
          alt="logo"
        />
        <div class="buttons-section">
          <Button @click="$router.push('/login')" v-if="!token">Login</Button>
          <Button v-if="!token" @click="$router.push('/register')"
            >Register</Button
          >
          <div v-else class="buttons-section">
            <button @:click="logout">Logout</button>
            <img :src="user.pic" @click="$router.push({ path: `/profile/${user._id}` })" class="user-logo" alt="logo" />
             
          </div>
        </div>
      </nav>
      <RouterView />
    </div>
  </template>
  
  <script>
  import { RouterLink, RouterView } from "vue-router";
  
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem("user")),
        token: localStorage.getItem("token"),
      };
    },
    methods: {
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
  
        console.log("token removed");
        setTimeout(() => {
          window.location.reload();
          this.$toast.success("You logged out successfully");
        }, 100);
      },
    },
    // inject: ["token"],
  };
  </script>
  
  <style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #f5f5f5;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  nav img {
    width: 150px;
    cursor: pointer;
  }
  
  .main-section {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .main-section div button {
    margin-right: 25px;
  }
  
  button {
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #89e5ff 0%, #5468ff 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%),
      0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%),
      inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 2em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.6em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
  }
  
  button:hover {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%),
      0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #3c4fe0;
    transform: translateY(-0.1em);
  }
  
  button:active {
    box-shadow: inset 0px 0.1em 0.6em #3c4fe0;
    transform: translateY(0.2em);
  }
  
  .user-logo {
    width: 60px;
    height: 50px;
    border: 1px solid black;
    border-radius: 50%;
    background-position: center;
    cursor: pointer;
  }
  .buttons-section {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 25px;
  }
  
  /* Responsive styles */
  
  @media (max-width: 768px) {
    nav img {
      width: 125px;
    }
  
    .user-logo{
      width: 50px;
    }
  }
  
  @media (max-width: 480px) {
    nav {
      padding: 0 8px;
    }
    nav img {
      width: 115px;
    }
    button {
      font-size: 14px;
    }
    .buttons-section {
      gap: 10px;
    }
  }
  </style>
  