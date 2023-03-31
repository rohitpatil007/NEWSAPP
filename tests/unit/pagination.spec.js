import Pagination from "../../src/components/shared/Pagination.vue";
import Vuex from "vuex";
import { createLocalVue, mount } from "@vue/test-utils";
import { expect } from "chai";

// Create local instance of vue
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("Pagination", Pagination);

describe("Pagination.vue", () => {
    let store;   
    const getters = {
        getPage: () => 1,
        getMaxPage:()=> 10
    };

    let component;
    before(() => {
        store = new Vuex.Store({
            getters
        });
        component = mount(Pagination, {
            store,
            localVue,
            propsData: {},
        });
    });

    // Test cases for Pagination component
    describe("Test elements in Pagination component", () => {
        // 1. Test Pagination container contains button
        it("should contains button inside container", () => {
            const item = component.find('.pagination-btn')
            expect(item.contains('button')).to.be.true
        });
    })
});

