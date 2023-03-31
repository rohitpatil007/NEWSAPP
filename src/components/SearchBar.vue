<template>
  <div class="search-container">
    <div class="search-box">
      <div class="search-input">
        <input-select :list="countries" :select="getCountry" :handleSelect="countrySet" />
      </div>
      <div class="search-input">
        <input-select :list="categories" :select="getCategory" :handleSelect="categorySet" />
      </div>
      <div class="search-input">
        <input type="text" :v="getQuery" @input="setInput" placeholder="Keywords (optional)" />
      </div>
      <div class="search-input btn-search">
        <button @click="fetchNews"><i class="fas fa-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import countries from "../constants/countries.json";
import categories from "../constants/categories.json";
import InputSelect from "../components/InputSelect.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: { InputSelect },
  data() {
    return {
      countries: countries,
      categories: categories,
    };
  },
  computed: {
    ...mapGetters([
      "allNews",
      "getCountry",
      "getCategory",
      "getLoading",
      "getQuery",
    ]),
  },
  methods: {
    ...mapActions(["getNews"]),
    ...mapMutations(["setQuery", "setCategory", "setCountry", "setQuery","setPageSecond"]),
    fetchNews() {
      this.setPageSecond(1);
      this.getNews()
    },
    setInput(e) {
      this.setQuery(e.target.value);
    },
    countrySet(e) {
      this.setCountry(e.target.value);
    },
    categorySet(e) {
      this.setCategory(e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    background-color: #888;
    padding: 12px 10%;
    .btn-search {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .btn-search button {
      background-color: #000000ab;
      color: #ffffff;
      border: none;
      outline: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-search button i {
      padding: 7px 7px;
    }
    .search-input select, input {
      padding: 5px 8px;
      min-width: 100px;
      border-radius: 4px;
      border: none;
      outline: none;
      width: 20vw;
    }
  }
}

@media screen and (min-width: 500px) and (max-width: 775px) {
  .search-box {
    padding: 12px 0%;
    justify-content: center;
    .search-input select, input {
      padding: 5px 8px;
      border-radius: 4px;
      border: none;
      outline: none;
      width: 20vw;
    }
  }
}
@media screen and (min-width: 200px) and (max-width: 500px) {
  .search-container{
    .search-box {
      display: block;
      padding: 12px 5%;
      justify-content: space-between;
      .search-input select, input {
        padding: 5px 8px;
        border-radius: 4px;
        border: none;
        outline: none;
        width: 100%;
        margin-top: 15px;
      }
      button {
        margin-top: 15px;
      }
    }
  }
}
</style>