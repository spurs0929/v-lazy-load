import Vue from 'vue';
import App from './App.vue';
import VueLazyload from './modules/vue-lazyload';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: 'http://localhost:3000/images/loading.gif',
  error: 'http://localhost:3000/images/error.jpg',
  preload: 1
});

new Vue({
  render: h => h(App),
}).$mount('#app')
