<template>
  <div class="app">
    <Header />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/shared/header";
export default {
  components: {
    Header,
  },
  beforeMount() {
    this.$store.dispatch("getNews");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: system-ui;
  background: #ccc;
}
button {
  cursor: pointer;
}
</style>
