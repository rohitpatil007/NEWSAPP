<template>
  <div class="details-container">
    <div class="news-detail" v-if="selectedNews">
      <div class="details-title">Home/Details/{{getId}}</div>
      <img class="news-img" :src="selectedNews.urlToImage"/>
      <h4>{{ selectedNews.title }}</h4>
      <h5>{{ selectedNews.source.name }}</h5>
      <p>{{ selectedNews.description }}</p>
      <p>{{ selectedNews.content }}</p>
      <router-link class="btnGo" to="/" >Go To Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedNews() {
      const publishedAt = this.$route.query.id;
      const newsData = this.$store.getters.allNews;
      const selectedNews = newsData.find(
        (news) => news.publishedAt === publishedAt
      );
      return selectedNews;
    },
    getId() {
      return this.$route.query.id
    }
  }
};
</script>

<style lang="scss" scoped>
.details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .news-detail {
    width: 65%;
    border: 1px solid mediumaquamarine;
    border-radius: 12px;
    box-shadow: 10px 10px #888888;
    background: azure;
    :nth-child(5) {
      font-size: 14px;
      }
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      padding: 20px 10%;
      margin: 50px 0;
      color: rgb(48, 48, 48);
      img {
      width: 50%;
      border-radius: 8px;
      }
      .btnGo {
      color: black;
      background-color: rgb(48, 48, 48);
      color: white;
      padding: 4px 8px;
      text-decoration: none;
      border-radius: 4px;
    }
  }
}

@media screen and (min-width: 200px) and (max-width: 500px) {
  .news-detail {
    padding: 10px 5%;
  }
}
</style>
