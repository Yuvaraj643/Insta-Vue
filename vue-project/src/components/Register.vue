<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import "vue-toast-notification/dist/theme-sugar.css";
import Nav from "./Nav.vue";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  components: {
    Nav,
  },
  methods: {
    submit() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log(user);
      const response = axios
        .post("https://instagram-83t5.onrender.com/signup", user)
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log("Invalid Username and Password");
          } else {
            this.$toast.success("Account has been Created Successfully");
            this.$router.push("/login");
          }
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

<template>
  <div>
    <Nav />
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
  background-color: #fff;
  display: block;
  padding: 3rem;
  max-width: 950px;
  height: 450px;
  border: 1px solid rgb(145, 144, 195);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1.5rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.form button {
  margin-left: 70px;
  margin-top: 15px;
}
.submit {
  padding: 15px 35px;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 500;
  width: 60%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  text-align: center;
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
</style>
