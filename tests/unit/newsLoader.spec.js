import NewsLoader from "../../src/components/shared/NewsLoader.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import { expect } from "chai";
import newsData from "../data/news.json"

// Create local instance of vue
const localVue = createLocalVue();
localVue.component("NewsLoader", NewsLoader);

describe("NewsLoader.vue", () => {
    let component;
    before(() => {
        component = mount(NewsLoader, {
            localVue,
            propsData: { news: JSON.stringify(newsData), totalResults: newsData.length },
        });
    });

    // Test cases for header component
    describe("Test elements in NewsLoader component", () => {

        // 1. Test total results of news count
        it("should display total results of news count", () => {
            const item = component.find('.news-count')
            const count = component.props().totalResults
            expect(item.text()).contain(`${count} News Result(s)`)
        });

        // 2. Test message showing 'News not found' if there are no news
        it("should display 'News not found' if no news", async  () => {
            await component.setProps({news : []})
            const item = component.find('.notFound')
            expect(item.text()).contain('News not found')
        });
    })
});

