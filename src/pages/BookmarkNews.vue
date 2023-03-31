<template>
  <div class="bookmark">
    <news-loader :news="getBookmarkNews" :loading="getLoading" :totalResults="getBookmarkNews.length" />
    <div class="bookmar-container">
      <news
        v-for="news in getBookmarkNews"
        :key="news.author"
        :thumbnail="news.urlToImage"
        :title="news.title"
        :author="news.author"
        :description="news.description"
        :published="news.publishedAt"
        :handleBookMark="handleBookMark"
        :bookMark="news.bookMark"
      />
    </div>
  </div>
</template>

<script>
import NewsLoader from "../components/shared/NewsLoader";
import News from "../components/News";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    NewsLoader,
    News,
  },
  computed: {
    ...mapGetters(["getBookmarkNews", "getLoading"]),
  },
  methods: {
    ...mapMutations(["setBookmarkNews"]),
    handleBookMark(title, shouldPush) {
      let newBookmarkArr = [...this.getBookmarkNews];
      const filteredNews = this.allNews.filter((n) => n.title === title);
      if (shouldPush) {
        newBookmarkArr.push(filteredNews[0]);
      } else {
        const indexOfBookmark = newBookmarkArr.findIndex(
          (b) => b.title === title
        );
        newBookmarkArr.splice(indexOfBookmark, 1);
      }
      this.setBookmarkNews(newBookmarkArr);
    },
  },
};
</script>

<style lang="scss" scoped>
.bookmark {
  display: flex;
  flex-direction: column;
  .bookmar-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    padding: 0 10%;
  }
}
@media screen and (min-width: 500px) and (max-width: 775px) {
  .news-container {
    padding: 0 5%;
    gap: 20px;
  }
}
@media screen and (min-width: 200px) and (max-width: 500px) {
  .news-container {
    padding: 0 5%;
    gap: 20px;
  }
}
</style>
