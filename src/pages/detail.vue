<template>
  <div>
    <div id="header">
      <img v-if="dJson.rst.shop_sign.image_hash !=''" class="headerBg"
           :src="dJson.rst.shop_sign.image_hash | bigImageHash">
      <img v-else class="headerBg" :src="dJson.rst.image_hash | imageHash">
      <img id="shopLogo" :src="dJson.rst.image_path | imageHash" alt="">
      <div id="goHome" class="fa fa-angle-left" @click="goHome"></div>
    </div>
    <div id="banner">
      <h3 @click="showDialog">
        <div id="title" v-text="dJson.rst.name"></div>
        <span class="fa fa-caret-right"></span>
      </h3>
      <p class="recent_order_num" @click="showDialog">
        <span v-text="'评价'+dJson.rst.rating"></span>
        <span v-text="'月售'+dJson.rst.recent_order_num+'单'"></span>
        <span v-text="dJson.rst.delivery_mode.text+'约'+
       dJson.rst.order_lead_time+'分钟'"></span>
      </p>
      <!--店名弹框-->
      <div>
        <x-dialog v-model="showDialogStyle" hide-on-blur
                  :dialog-style="{'max-width': '100%', width: '100%', height: '50%',
                  'background-color': 'transparent'}">
          <div class="mask">
            <div class="is_premium">
              <span class="brand" v-if="dJson.is_premium">品牌</span>
              <h2 v-text="dJson.rst.name"></h2>
            </div>
            <div class="mask_order_num">
              <div>
                <h4 v-text="dJson.rst.rating"></h4>
                <span>评价</span>
              </div>
              <div>
                <h4 v-text="dJson.rst.recent_order_num+'单'"></h4>
                <span>月售</span>
              </div>
              <div>
                <h4 v-text="dJson.rst.delivery_mode.text"></h4>
                <span v-text="'约'+dJson.rst.order_lead_time+'分钟'"></span>
              </div>
              <div>
                <h4 v-text="dJson.rst.piecewise_agent_fee.rules[0].fee+'元'"></h4>
                <span>配送费</span>
              </div>
              <div>
                <h4>{{dJson.rst.distance | addUnit}}</h4>
                <span>距离</span>
              </div>
            </div>
            <divider id="vux-divider">公告</divider>
            <div class="mask_promotion_info" v-text="dJson.rst.promotion_info"></div>
          </div>
          <x-icon type="ios-close-outline" style="fill:#fff;"  @click="showDialogStyle = false"></x-icon>
        </x-dialog>
      </div>
      <!--活动-->
      <div class="actives">
        <div v-for="(act,index) in dJson.rst.activities" :key="index">
         <span v-if="act.is_exclusive_with_food_activity && index<1" v-text="act.icon_name"
               :style="{background:'#'+act.icon_color,
         color:'#ffffff',padding:'0 2px'}"></span>
          <span v-if="act.is_exclusive_with_food_activity&& index<1"
                v-text="act.tips" class="tips"></span>
          <span v-if="index==0" @click="isActive=!isActive">
           <span v-text="dJson.rst.activities.length+'个优惠'"></span>
           <span class="fa fa-caret-down"></span>
         </span>
        </div>
      </div>
      <popup v-model="isActive" :hide-on-blur=false>
        <div class="mask_act">
          <div class="mask_act_header">
            <span>&nbsp;</span>
            <span>优惠活动</span>
            <span @click="isActive=false">×</span>
          </div>
          <div class="mask_content">
            <div v-for="(act,index) in dJson.rst.activities" :key="index">
              <div v-text="act.icon_name" :style="{background:'#'+act.icon_color,
             color:'#ffffff',padding:'0 2px'}"></div>
              <div v-text="act.tips" class="tips"></div>
            </div>
          </div>
        </div>
      </popup>
      <p class="promotion_info" v-text="'公告：'+dJson.rst.promotion_info"></p>

      <!--导航-->
      <div class="navTab">
        <span v-for="(navItem,index) in navTabList" :key="index" v-text="navItem.text"
              :class="{isClick:navItem.isShow}" @click="menuChange(navItem)"></span>
      </div>
      <main>
        <!--推荐-->
        <div v-if="menuIsShow==0">
          <recommend :dJson="dJson"></recommend>
        </div>
        <div v-if="menuIsShow==1">
          <appraise :dJson="dJson"></appraise>
        </div>
        <div v-if="menuIsShow==2">
          <h1>暂无信息</h1>
        </div>
      </main>

    </div>
  </div>
</template>

<script>
  import detailJson from '../../static/detailData.json'
  import recommend from '../components/home/recommend'
  import appraise from '../components/home/appraise'
  import {XDialog} from 'vux'

  export default {
    name: "",
    components: {
      XDialog,
      recommend,
      appraise
    },
    data() {
      return {
        dJson: {},
        showDialogStyle: false,
        //优惠
        isActive: false,
        menuIsShow: 0,
        navTabList: [
          {text: "点餐", isShow: true, id: 0},
          {text: "评价", isShow: false, id: 1},
          {text: "商家", isShow: false, id: 2}
        ]
      }
    },
    filters: {
      addUnit(value) {
        if (value < 1000) {
          return value + "m";
        }
        return (value / 1000).toFixed(2) + "km";
      }
    },

    created() {
      // console.log(this.$route);
      console.log(this.$route.query.id);
      this.dJson=detailJson;

    },
    mounted(){
      this.getDateJson();
      $(".weui-tabbar").hide();
    },
    destroyed(){
      $(".weui-tabbar").show();
    },
    methods: {
      getDateJson(){
        this.$http.get("/ele/pizza/shopping/restaurants/"+this.$route.query.id+"/batch_shop?&extras=%5B%22activities%22%2C%22albums%22%2C%22license%22%2C%22identification%22%2C%22qualification%22%5D&terminal=h5&latitude=34.747935&longitude=113.622758").then(function (value) {
          console.log(value);
          this.dJson = value.body;
        })
      },
      showDialog() {
        this.showDialogStyle = !this.showDialogStyle
      },
      //  菜单切换
      menuChange(value) {
        this.navTabList.forEach(function (item) {
          item.isShow = false;
        });
        value.isShow = !value.isShow;
        this.menuIsShow = value.id;
      },
      goHome(){
        window.location.href='http://localhost:8080'
      }

    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
  }

  .headerBg {
    width: 100vw;
    height: 27vw;
    -webkit-filter: blur(1px); /* Chrome, Safari, Opera */
    filter: blur(1px);
    position: relative;
  }
  #goHome{
    font-size: 10vw;
    color: #FFffff;
    position: absolute;
    left: 3vw;
    top: 2vw;
    z-index: 10;
  }
  .recent_order_num {
    font-size: 3.3vw;
    color: #666666;
    margin: 1vw 0;
    text-align: center;
  }
  #shopLogo {
    display: block;
    position: absolute;
    left: 40vw;
    top: 12vw;
    width: 20vw;
    height: 20vw;
    /*margin: -15vw auto;*/
    border-radius: 1vw;
  }

  #banner {
    margin-top: 8vw;
  }

  #banner h3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #banner #title {
    display: inline-block;
    width: 60vw;
    max-width: 60vw;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /*店名弹框*/
  .mask {
    max-width: 80vw;
    padding: 4vw 3vw;
    color: #333333;
    background-color: #FFffff;
    margin: 0vw auto 5vw;
  }
  /*品牌*/
  .brand {
    font-size: 3.5vw;
    height: 5vw;
    white-space: nowrap;
    background-color: #FFEE0B;
    color: #6F3F15;
    padding: 0px 2px;
    margin-top:2vw;
    border-radius: 2px;

    /*vertical-align: bottom;*/
  }
  .is_premium{
   display: flex;
    padding: 0 5vw;
  }

  .mask_order_num {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mask_order_num div span {
    font-size: 3.2vw;
    color: #a2a2a2;
  }

  #vux-divider {
    width: 35vw;
    margin: 2vw auto;
    color: #a2a2a2;
  }

  .mask_promotion_info {
    color: #5a5a5a;
    padding: 1px 2px;
    margin: 3vw;
    font-size: 3.5vw;
    text-align: left;
    height: 23vw;
    overflow-y: scroll;
  }

  .actives {
    font-size: 3.2vw;
    color: #333333;
    width: 82vw;
    margin: 0 auto;
    text-align: left;
  }

  .actives .tips {
    display: inline-block;
    margin: 0px 0 -4px 4px;
    width: 53vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*活动弹出层*/
  .mask_act {
    height: 70vw;
    background-color: #FFffff;
    overflow: hidden;
  }

  .mask_act_header {
    padding: 3vw;
    font-size: 5vw;
    font-weight: bold;
    display: flex;
    justify-content: space-between;

  }

  .mask_act_header > span:nth-child(3) {
    font-size: 10vw;
    font-weight: normal;
    position: relative;
    color: #a2a2a2;
    top: -3vw;
  }

  .mask_content {
    width: 80vw;
    padding-bottom: 20vw;
    margin: 0 auto;
    font-size: 3.2vw;
    text-align: left;
    color: #777777;
    height: 100%;
    overflow-y: scroll;
  }

  .mask_content > div {
    display: flex;
    justify-content: flex-start;
    margin: 2vw 0;
  }

  .mask_content .tips {
    margin-left: 2vw;
  }

  .promotion_info {
    width: 82vw;
    font-size: 3.2vw;
    color: #a2a2a2;
    margin: 1vw auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  /*导航菜单*/
  .navTab {
    width: 100vw;
    height: 12vw;
    margin-top: 5vw;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #eeeeee;
    background-color: #FFffff;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navTab > span {
    color: #a2a2a2;
    height: 12vw;
    line-height: 12vw;
    position: relative;
  }

  .navTab .isClick {
    color: #333333;
    font-weight: bold;
  }

  .navTab .isClick::after {
    display: block;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #2395FF;
    position: absolute;
    bottom: 0;
    transition: all 1s;
  }


</style>
