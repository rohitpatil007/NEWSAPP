import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import { router } from "./router/index";
import { store } from './store';

Vue.use(VueResource);
Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
