const state = {
  apiKey: "fe0cfc25a9494617909e63ef4db9825b",
  isTopNews: true,
  news: [],
  bookmarkNews: [],
  category: "Business",
  country: "in",
  query: "",
  loading: false,
  page: 1,
  pageSize: 12,
  totalResults: "",
  maxPage: 0,
};

const getters = {
  getTopNewsState:(state) => state.isTopNews,
  allNews: (state) => state.news,
  getCategory: (state) => state.category,
  getCountry: (state) => state.country,
  getLoading: (state) => state.loading,
  getQuery: (state) => state.query,
  getBookmarkNews: (state) => state.bookmarkNews,
  getPage: (state) => state.page,
  getPageSize: (state) => state.pageSize,
  getMaxPage: (state) => state.maxPage,
  getTotalResults: (state) => state.totalResults,
};

const mutations = {
  setTopNewsState:(state,payload) => state.isTopNews = payload,
  setNews: (state, payload) => (state.news = payload),
  setCategory: (state, category) => (state.category = category),
  setCountry: (state, country) => (state.country = country),
  setQuery: (state, query) => (state.query = query),
  setFilterNews: (state, payload) => (state.news = payload),
  setBookmarkNews: (state, payload) => (state.bookmarkNews = payload),
  setPage: (state, payload) => { state.page += payload },
  setPageSecond: (state, payload) => { state.page = payload },
  setTotalResults: (state, payload) => (state.totalResults = payload),
  setMaxPage: (state, payload) => (state.maxPage = payload),
};

const actions = {
  getNews: async function (context) {
    const baseUrl = 'https://newsapi.org/v2'
    const topUrl = `${baseUrl}/top-headlines?q=${state.query}&country=${state.country}&category=${state.category}&pageSize=${state.pageSize}&page=${state.page}&apiKey=${state.apiKey}`;
    const everythingUrl = `${baseUrl}/everything?q=${state.query}&page=${state.page}&pageSize=${state.pageSize}&apiKey=${state.apiKey}`;
    const selectedUrl = ((state.query && state.country && state.category) || (state.country && state.category)) ? topUrl : everythingUrl
    try {
      state.loading = true;
      const response = await fetch(selectedUrl);
      const data = await response.json();
      const arr = [];
      for (let i = 0; i < data.articles.length; i++) {
        data.articles[i]["bookMark"] = false;
        arr.push(data.articles[i]);
      }
      context.commit("setNews", arr);
      context.commit("setTotalResults", data.totalResults);
      context.commit("setMaxPage",Math.ceil(data.totalResults / state.pageSize));
      state.loading = false;
    } catch (err) {
      state.loading = false;
      console.log(err.message);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
