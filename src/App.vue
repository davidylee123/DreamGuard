<template>
  <div id="app">
    <img alt="DreamGuard logo" src="./assets/logo.webp" width="350" />
    <div class="stars"></div>
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
  color: #000000;
  position: relative;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background-color: #04072c;
  background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
}
</style>
