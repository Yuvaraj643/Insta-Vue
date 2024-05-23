<template>
  <Loader :active="loaderActive" />
  <div v-show="!loaderActive">
    <section>
      <form class="form" @:submit.prevent="submit">
        <p class="form-title">Create your account</p>
        <div class="input-container">
          <input type="name" placeholder="Enter name" v-model="name" required />
        </div>
        <div class="input-container">
          <input
            type="email"
            placeholder="Enter email"
            v-model="email"
            required
          />
        </div>
        <div class="input-container">
          <input
            type="password"
            placeholder="Enter password"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="submit">Register</button>
        <p class="signup-link">
          Already have a Account?
          <a href="" @click="$router.push('/login')">Login</a>
        </p>
      </form>
    </section>

    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import "vue-toast-notification/dist/theme-sugar.css";
import Loader from "./Child-Components/Loader.vue";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loaderActive: false,
    };
  },
  components: {
    Loader,
  },
  methods: {
    showLoader() {
      this.loaderActive = true;
    },
    hideLoader() {
      this.loaderActive = false;
    },
    submit() {
      this.showLoader();
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        image: this.image,
      };
      console.log(user);
      const response = axios
        .post("https://instagram-server-bye5.onrender.com/signup", user)
        .then((data) => {
          setTimeout(() => {
            console.log(data);
            if (data.error) {
              console.log("Invalid Username and Password");
            } else {
              this.$toast.success("Account has been Created Successfully");
              this.$router.push("/login");
            }
          });
          this.hideLoader();
        });
    },
  },
  provide() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  inject: ["token"],
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
  display: block;
  padding: 3rem;
  max-width: 950px;
  height: 550px;
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
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input {
  outline: none;
  margin: 8px 0;
}

.upload {
  width: 210px;
}

.upload::file-selector-button {
  margin-right: 10px;
  padding: 10px 30px;
  background-color: #46e556;
  color: #060303;
  border: 1px solid green;
  font-weight: 550;
  font-size: 18px;
  width: 200px;
  border-radius: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
}
.input-container input {
  background-color: #fff;
  padding: 1.5rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.form button {
  margin-left: 70px;
  margin-top: 15px;
}
.submit {
  padding: 15px 35px;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 550;
  font-size: 18px;
  width: 60%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  text-align: center;
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
  form {
    padding: 2rem;
    height: 550px;
    width: 80%;
  }
  .input-container input {
    width: 76%;
  }
  section {
    height: 80vh;
  }
}
</style>
