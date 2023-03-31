<template>
  <div class="news-container">
    <div>
      <img
        class="thumbnailImg"
        v-if="thumbnail == null"
        src="../assets/noImageFound.jpg"
        alt="news"
      />
      <img v-else class="thumbnailImg" :src="thumbnail" alt="news" />
    </div>

    <div class="news-title">
      <p>{{ title }}</p>
      <p>{{ author }}</p>
      <p>{{ description }}</p>
    </div>
    <div class="news-footer">
      <router-link :to="'/news-detail?id=' + published">
        <button class="btnGoPage">Go to Page</button>
      </router-link>
      <button
        class="btnBookmarked"
        @click="handleBookMark(title, false)"
        v-if="isInBookmarkList()"
      >
        <i class="fas fa-bookmark"></i>
      </button>
      <button class="btnBookmark" @click="handleBookMark(title, true)" v-else>
        <i class="far fa-bookmark"></i>
      </button>
    </div>
    <p>Published : {{ published }}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: [
    "thumbnail",
    "title",
    "author",
    "description",
    "published",
    "bookMark",
  ],
  computed: {
    ...mapGetters(["getBookmarkNews", "allNews"]),
  },
  methods: {
    ...mapMutations(["setBookmarkNews"]),
    isInBookmarkList() {
      return (
        this.getBookmarkNews.filter((b) => b.title === this.title).length > 0
      );
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
};
</script>

<style lang="scss" scoped>
.news-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  max-width: 500px;
  background-color: #ffffff;
  flex-grow: 1;
  border-radius: 0 0 4px 4px;
  img {
    width: 100%;
    height: 200px;
  }
  .news-title {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px 15px;
    p:nth-child(1) {
      color: #000000ab;
      font-size: 16px;
      font-weight: 600;
    }
    p:nth-child(2) {
      color: #ccc;
      font-size: 14px;
    }
    p:nth-child(3) {
      color: #888;
      font-size: 12px;
    }
  }
  .news-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 15px 15px;
    width: 100%;
    margin-top: auto;
    align-self: flex-start;
    button {
      border: none;
      outline: none;
      background: transparent;
      padding: 4px 8px;
      border-radius: 3px;
      height: 35px;
    }
    button:nth-child(1) {
      background: #000000ab;
      color: #ffffff;
    }
    button i {
      font-size: 30px;
    }
  }
}
.news-container > p {
  align-self: flex-start;
  border-top: 1px solid gainsboro;
  padding: 10px 0 10px 15px;
  margin-top: auto;
  width: 100%;
  color: #9b9b9b;
  font-size: 14px;
}

@media screen and (min-width: 500px) and (max-width: 775px) {
  .news-container {
    width: 200px;
    flex-grow: 1;
  }
}
@media screen and (min-width: 200px) and (max-width: 500px) {
  .news-container {
    width: 200px;
    flex-grow: 1;
  }
}
</style>
