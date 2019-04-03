// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import FontAwesome from '../static/font-awesome/css/font-awesome.css'
Vue.use(FontAwesome)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import {LoadMore,Divider,Popup} from 'vux'
Vue.component('load-more', LoadMore) //加载
Vue.component('Divider', Divider)
Vue.component('Popup', Popup)


// 补全图片路径
import imageHash from './filters/imageHash.js'
Vue.use(imageHash)
import bigImageHash from './filters/bigImageHash.js'
Vue.use(bigImageHash)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
