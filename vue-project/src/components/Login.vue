
<template>
  <div>
    <Nav /> 
    <section>      
      <form class="form" @:submit.prevent="login">
         <p class="form-title" >Sign in to your account</p>
          <div class="input-container">
            <input type="email" v-model="email" placeholder="Enter email" required>
            <span>
            </span>
        </div>
        <div class="input-container">
            <input type="password" v-model="password" placeholder="Enter password" required >
          </div>
           <button type="submit" class="submit" >
          Sign in
        </button>
  
        <p class="signup-link">
          No account?
          <a href="" @click="$router.push('/register')">Sign up</a>
        </p>
     </form> 
      </section>
  <RouterView />
</div>
</template>


<script >
import { RouterLink, RouterView } from 'vue-router'
import 'vue-toast-notification/dist/theme-sugar.css';
import Nav from './Nav.vue';
export default {

  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Nav
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      }
      console.log(user);
      fetch('https://instagram-83t5.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((response) => response.json())
      .then((response) => {
        console.log("RESPONSE", response)
        if(response.error){
          console.log("Invalid Username and Password");
          this.$toast.error('Invalid Username and Password');
        }else{
          this.$toast.success('Login successful');
          let token = localStorage.setItem('token', response.token)
          localStorage.setItem('id', response.user._id)
          this.$router.push('/home');
        }
      })

  },
  },
  provide(){
    return{
      token : localStorage.getItem('token'),
      id : localStorage.getItem('id')
    }
  }
}
</script>

<style scoped>
section{
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
form {
  background-color: white;
  display: block;
  padding: 3rem;
  max-width: 950px;
  height: 400px;
  border: 1px solid rgb(145, 144, 195);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

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

.input-container input{
  outline: none;
  border: 1px solid white;
  margin: 8px 0;
}

.input-container input {
  background-color: white;
  padding: 1.5rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form button{
  margin-left:45px;
  margin-top: 15px;

}

.submit {
  padding: 15px 35px;
  background-color: #4F46E5;
  color: white;
  font-weight: 500;
  width: 80%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  text-align: center;
}

.signup-link {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}

</style>
