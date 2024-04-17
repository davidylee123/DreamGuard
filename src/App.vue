<template>
  <div id="app">
    <img alt="DreamGuard logo" src="./assets/logo.webp" width="300" />
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from "./components/PostComponent.vue";

export default {
  name: "App",
  components: {
    PostComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
