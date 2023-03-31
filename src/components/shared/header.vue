<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/">Vue News Search & Bookmarks</router-link>
    </div>
    <div class="header-right">
      <router-link to="/">
        <span @click="handleTopNews" :class="getTopNewsState ? 'active' : 'inactive'">Top News</span>
      </router-link>
      <router-link to="/bookmarks">
        <span @click="handleBookMark" :class="!getTopNewsState ? 'active' : 'inactive'">BookMarks</span>
      </router-link>
      <i class="fas fa-circle"  :class="!getTopNewsState ? 'active' : 'inactive'"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapMutations} from 'vuex'
export default {
  computed:{
    ...mapGetters(["getTopNewsState"])
  },
  methods: {
    ...mapMutations(["setTopNewsState"]),
    handleTopNews() {
      this.setTopNewsState(true)
    },
    handleBookMark() {
      this.setTopNewsState(false)
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10%;
  width: 100%;
  background-color: #000000ab;
  gap: 10px;
  a {
    text-decoration: none;
  }
  .header-left {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
    color: #ffffff;
  }
  }
  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    a, .fa-circle {
    color: #ccc;
    }
    i {
      font-size: 10px;
      color: #ffffff;
    }
  }
  .active {
    color: #ffffff !important;
  }
}

@media screen and (min-width: 500px) and (max-width: 775px) {
  .header {
    padding: 10px 5%;
  }
}
@media screen and (min-width: 200px) and (max-width: 500px) {
  .header {
    padding: 10px 5%;
    flex-direction: column;
  }
}
</style>