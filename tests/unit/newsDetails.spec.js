import NewsDetails from "../../src/pages/NewsDetails.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { expect } from "chai";
import VueRouter from 'vue-router'
import Vuex from "vuex";
import newsData from "../data/news.json"

// Create local instance of vue
const localVue = createLocalVue();
localVue.use(VueRouter)
localVue.use(Vuex);
localVue.component("NewsDetails", NewsDetails);
const router = new VueRouter()

describe("NewsDetails.vue", () => {
    let store;
    const getters = {
        allNews: () => newsData
    };
    router.push({ path: '/news-detail', query: { id: '2022-04-12T10:22:00Z' } })
    let component;
    before(() => {
        store = new Vuex.Store({
            getters
        });
        component = mount(NewsDetails, {
            store,
            localVue,
            router
        });
    });

    // Test cases for NewsDetails component
    describe("Test elements in NewsDetails component", () => {

        // 1. Test news image url equal to image src attribute
        it("should same image src attribute to news image url",  () => {
            const item = component.vm.selectedNews
            const attr =  component.find('.news-img').attributes('src')
            expect(attr).equal(item.urlToImage);
        });

        // 2. Test 'Go To Home' button showing or not
        it("should display Go To Home button", () => {
            const item = component.find('.btnGo')
            expect(item.text()).contain('Go To Home')
        });

        // 3. Test 'Go To Home' button showing or not
        it("should display details title", () => {
            const item = component.find('.details-title')
            expect(item.text()).contain('Home/Details/2022-04-12T10:22:00Z')
        });

        // 3. Test redirection on click 'Go To Home' button
        it("should redirect to home page on click of button", () => {
            const item = component.find('.btnGo')
            item.trigger("click");
            expect(window.location.pathname).equal('/')
        });
    })
});

