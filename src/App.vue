<template>
  <div id="app">
    <router-view/>

    <tabbar>
      <tabbar-item selected link="/">
        <img @click="refresh" slot="icon-active" src="./assets/tabbar/ele_active.svg">
        <img @click="refresh" slot="icon" src="./assets/tabbar/ele.svg">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="search">
        <img slot="icon-active" src="./assets/tabbar/search_active.svg">
        <img slot="icon" src="./assets/tabbar/search.svg">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item  link="/order">
        <img slot="icon-active" src="./assets/tabbar/bill_active.svg">
        <img slot="icon" src="./assets/tabbar/bill.svg">
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item link="me">
        <img slot="icon-active" src="./assets/tabbar/my.svg">
        <img slot="icon" src="./assets/tabbar/my.svg">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>


<script>
  import {Tabbar, TabbarItem} from 'vux' //导入tabbar
import bus from './js/bus.js'

  export default {
    name: 'App',
    components: {
      Tabbar,
      TabbarItem
    },
    methods:{
      refresh(){
        bus.$emit("positioncancel")
      }
    }
  }
</script>
<style>
  *{
    box-sizing: border-box;
  }
  img{
    vertical-align: bottom;
  }
  /*　　清除所有a标签在点击时出现的特效：*/
  a{
    -webkit-tap-highlight-color:rgba(255,0,0,0);
  }

  html,body{
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding-bottom: 19vw;
  }
  .weui-tabbar{
    position: fixed !important;
    bottom: 0;
    z-index: 999;
  }
  .weui-tabbar a{
    text-decoration: none;
  }
</style>
