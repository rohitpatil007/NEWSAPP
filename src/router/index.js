import Vue from 'vue';
import VueRouter from 'vue-router';
import TopNews from '../pages/TopNews.vue'
import NewsDetails from '../pages/NewsDetails.vue'
import BookmarkNews from '../pages/BookmarkNews.vue'

const routes = [
    { path: '/', component: TopNews },
    { path: '/news-detail', component: NewsDetails, params: ['id'] },
    { path: '/bookmarks', component: BookmarkNews }

]
Vue.use(VueRouter);
export const router = new VueRouter({
    routes,
    mode: 'history'
});

