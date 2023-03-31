<template>
  <div class="container">
    <search-bar />
    <news-loader :news="allNews" :loading="getLoading" :totalResults="getTotalResults" />
    <div class="news-section">
      <news
        v-for="news in allNews"
        :key="news.author"
        :thumbnail="news.urlToImage"
        :title="news.title"
        :author="news.author"
        :description="news.description"
        :published="news.publishedAt"
        :bookMark="news.bookMark"
      />
    </div>
    <Paginaton :changePage="changePage" v-if="getTotalResults > getPageSize" />
  </div>
</template>

<script>
import NewsLoader from "../components/shared/NewsLoader";
import SearchBar from "../components/SearchBar.vue";
import News from "../components/News";
import Paginaton from "../components/shared/Pagination";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: { NewsLoader, SearchBar, Paginaton, News },
  computed: {
    ...mapGetters([
      "allNews",
      "getLoading",
      "getPage",
      "getTotalResults",
      "getPageSize",
      "getMaxPage",
      "getBookmarkNews",
    ]),
  },
  methods: {
    ...mapActions(["getNews"]),
    ...mapMutations(["setBookmarkNews", "setNews", "setPage", "setFilterNews","setTopNewsState"]),
    changePage(pageNo) {
      this.setPage(pageNo);
      this.getNews();
    },

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
  activated(){
    this.setTopNewsState(true)
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .news-section {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    padding: 0 10%;
  }
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .news-section {
    padding: 0 5%;
    gap: 20px;
  }
}

@media screen and (min-width: 200px) and (max-width: 600px) {
  .news-section {
    padding: 0 5%;
    gap: 20px;
  }
}
</style>
