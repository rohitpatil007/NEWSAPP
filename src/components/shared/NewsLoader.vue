<template>
  <div class="loader-container">
    <p class="news-count" v-if="news && news.length > 0">
      {{ totalResults }} News Result(s)
    </p>

    <p class="loader" v-else>
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
      <span class="notFound" v-if="!loading">News not found</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["news", "loading", "totalResults"],
};
</script>

<style lang="scss" scoped>
.loader-container {
  margin-bottom: 20px;
  .news-count {
    text-align: center;
    font-weight: 500;
  }
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 50px;
  }
} 
</style>