<template>
  <Nav />
  <div>
    <Loader :active="loaderActive" />
    <section v-show="!loaderActive">
      <form class="form animate__animated animate__slideInUp" @:submit.prevent="login">
        <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <input
            type="email"
            v-model="email"
            placeholder="Enter email"
            required
          />
          <span> 

          </span>
          
        </div>
        <div class="input-container">
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" class="submit">Sign in</button>

        <p class="signup-link">
          No account?
          <a href="" @click="$router.push('/register')">Sign up</a>
        </p>
      </form>
    </section>
    <RouterView />
  </div>
</template>

<script>
import 'animate.css'
import Nav from '../components/Nav.vue';
import { RouterLink, RouterView } from "vue-router";
import "vue-toast-notification/dist/theme-sugar.css";
import Loader from "./Child-Components/Loader.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      loaderActive: false,
      user: null,
    };
  },
  components: {
    Loader,
    Nav,
  },
  methods: {
    showLoader() {
      this.loaderActive = true;
    },
    hideLoader() {
      this.loaderActive = false;
    },
    login() {
      this.showLoader();
      this.$toast.warning("Please wait while we log you in", {
        duration: 3000,
      });
      const user = {
        email: this.email,
        password: this.password,
      };
      console.log(user);
      fetch("https://instagram-server-bye5.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("RESPONSE", response);
          if (response.error) {
            console.log("Invalid Username and Password");
            this.$toast.error("Invalid Username and Password");
          } else {
            this.$toast.success("Login successful");
            let token = localStorage.setItem("token", response.token);
            localStorage.setItem("id", response.user._id);
            this.user = response.user;
            localStorage.setItem("user", JSON.stringify(this.user));
            console.log(user);
            this.$router.push("/home");
          }
          this.hideLoader();
        }, 3000);
    },
  },
  provide() {
    return {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id"),
    };
  },
};
</script>

<style scoped>
section {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
form {
  background-color: white;
  display: block;
  padding: 3rem;
  max-width: 950px;
  height: 400px;
  border-radius: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.form-title {
  font-size: 1.75rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: black;
}

.input-container {
  position: relative;
}

.input-container input {
  outline: none;
  margin: 8px 0;
}

.input-container input {
  background-color: rgb(246, 246, 249);
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 250px;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.form button {
  margin-top: 15px;
}

.submit {
  padding: 15px 35px;
  background-color: #4f46e5;
  color: white;
  font-weight: 550;
  width: 75%;
  font-size: 18px;
  margin-left: 12%;
  border-radius: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
}

.signup-link {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}

/* Responsive Styles */

@media (max-width: 768px) {
  section {
    height: 80vh;
  }

  form {
    max-width: 80%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .input-container input {
    width: 75%;
    padding: 18px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .form button {
    text-align: center;
  }

  .submit {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  form {
    max-width: 90%;
    margin-top: 0px;
  }

  .form-title {
    font-size: 25px;
  }
}
</style>
