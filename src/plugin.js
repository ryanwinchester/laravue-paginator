import Paginator from './Paginator.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('laravue-paginator', Paginator);
  }
};