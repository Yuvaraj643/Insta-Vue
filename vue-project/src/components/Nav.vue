<template>
  <div class="main-section">
    <header>
      <img src="./assets/logo.png" alt="logo" />
    </header>
    <div class="buttons-section">
      <button @click="$router.push('/login')" v-show="!token">Login</button>
      <button v-if="!token" @click="$router.push('/register')">Register</button>
      <div v-else class="buttons-section">
        <button @:click="logout">Logout</button>
        <img :src="user.pic" class="user-logo" @click="$router.push({ path: `/profile/${user._id}` })" alt="logo" />
      </div>
    </div>
    <RouterView />
  </div>
</template>



<style>
img {
  width: 170px;
}

</style>
