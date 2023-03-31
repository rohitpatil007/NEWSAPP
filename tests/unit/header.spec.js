import Header from "../../src/components/shared/header.vue";
import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import  { expect } from "chai";
import sinon from "sinon";

// Create local instance of vue
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("Header", Header);

describe("Header.vue", () => {
    let store;
    const getters = {
        getTopNewsState: () => true
    };

    let component;
    const mockMethod = sinon.spy();

    before(() => {
        store = new Vuex.Store({
            getters
        });
        component = mount(Header, {
            store,
            localVue,
            methods: { clicked: mockMethod }
        });
    });

    // Test cases for header component
    describe("Test elements & functions in header component", () => { 
       
        // 1. Test title is showing or not
        it("should display correct title", () => {
            const item = component.find('.header-left')
            expect(item.text()).contain('Vue News Search & Bookmarks')
        });
    
        // 2. Test left menu contains 'Top News'
        it("should display header left menu- 'Top News'", () => {
            const item = component.find('.active')
            expect(item.text()).contain('Top News')
        });

        // 3. Test left menu contains 'BookMarks'
        it("should display header left menu- 'BookMarks'", () => {
            const item = component.find('.inactive')
            expect(item.text()).contain('BookMarks')
        });
    
        // 4. Test function is calling on click bookmark
        it("click on BookMarks and should call function to open bookmark page", () => {
            component.setMethods({ handleBookMark: mockMethod });
            component.find('.inactive').trigger("click");
            expect(mockMethod.called).to.be.true
        });    
    })
});
