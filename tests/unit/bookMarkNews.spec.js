import BookmarkNews from "../../src/pages/BookmarkNews.vue";
import NewsLoader from "../../src/components/shared/NewsLoader.vue";
import News from "../../src/components/News.vue"
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import VueRouter from 'vue-router'
import Vuex from "vuex";
import bookMarkNews from "../data/bookMarkNews.json"
import newsData from "../data/news.json"

// Create local instance of vue
const localVue = createLocalVue();
localVue.use(VueRouter)
localVue.use(Vuex);
localVue.component("BookmarkNews", BookmarkNews);
const router = new VueRouter()

//it will cover test cases for child components i.e News.vue & NewsLoader.vue
describe("BookmarkNews.vue", () => {
    let store;
    const getters = {
        getBookmarkNews: () => bookMarkNews,
        getLoading: () => false,
        allNews: () => newsData
    };
    const mutations = {
        setBookmarkNews: (payload) => {
            const indexOfBookmark =  payload.findIndex(
                (b) => b.title === payload[0].title
            );
            getters.getBookmarkNews().splice(indexOfBookmark, 1);
        }
    };
    router.push(  
        { path: '/bookmarks' }, { base: 'localhost:8081'})
    let component;
    before(() => {
        store = new Vuex.Store({
            getters,
            mutations
        });
        component = shallowMount(BookmarkNews, {
            store,
            localVue,
            router,
            stubs: { NewsLoader, News }
        });
    });

    // Test cases for NewsLoader child component rendred in BookmarkNews component
    describe("Test elements in NewsLoader component", () => {
        // 1. Test total results of news count
        it("should display total results of news count", async () => {
            const childComponent = await component.findComponent(NewsLoader)
            const item = childComponent.find('.news-count').text()
            const count = getters.getBookmarkNews().length
            expect(item).contain(`${count} News Result(s)`)
        });
    });

    // Test cases for News child component rendred in BookmarkNews component
    describe("Test elements in News component", () => {
       
        // 1. Test news image url equal to image src attribute
        it("should same image src attribute to news image url", async () => {
            const childComponent = await component.findComponent(News)
            const attr = childComponent.find('.thumbnailImg').attributes('src')
            const bookMarkedNews = getters.getBookmarkNews()
            const imgUrl = bookMarkedNews[0].urlToImage
            expect(attr).equal(imgUrl);
        });

        // 2. Test 'Go to Page' and bookmark icon buttons
        it("should display buttons in news", async () => {
            const childComponent = await component.findComponent(News)
            const btnGoToPage = childComponent.find('.btnGoPage')
            const btnBookmarked = childComponent.find('.btnBookmarked')
            expect(btnGoToPage.text()).contain('Go to Page')
            expect(btnBookmarked.isVisible()).to.be.true
        });

        // 3. Test redirection on click 'Go to Page' button
        it("should redirect to news details page on click of button", async () => {
            const childComponent =  component.findComponent(News)
            const btnGoToPage = childComponent.find('.btnGoPage')
            btnGoToPage.trigger("click");
            expect(window.location.href).equal('http://localhost/#/news-detail?id=2022-04-12T10%3A22%3A00Z')
        });

        // 4. Test click on bookmark button
        it("should un bookmark news and count of bookmark should be 1", async () => {
            const childComponent = component.findComponent(News)
            const btnBookmarked = childComponent.find('.btnBookmarked')
            btnBookmarked.trigger("click");
            const news = getters.getBookmarkNews()
            mutations.setBookmarkNews(news)
            expect(getters.getBookmarkNews().length).equal(1)
        });
    })
});