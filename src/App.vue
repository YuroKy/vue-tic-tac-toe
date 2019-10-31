<template>
  <div id="app">
    <Area />
  </div>
</template>

<script>
import Area from "./components/Area/index.vue";

export default {
  name: "app",
  components: {
    Area
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
