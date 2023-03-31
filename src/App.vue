<template>
  <div class="app">
    <Header />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/shared/header";
import Footer from "./components/shared/Footer";

export default {
  components: {
    Header,
    Footer,
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
