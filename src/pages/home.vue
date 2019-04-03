<template>
  <div>
    <homeHeader @myLocation="newLocation"></homeHeader>
    <div>
      <!--show-mask去掉遮罩层
      popup-style 设置层级关系，显示tabbar-->
      <popup v-model="positionIsShow" position="right"
             :popup-style="{zIndex:1}" :show-mask="false" width="100vw">
        <position @getnewaddress="getNewAddress"></position>
      </popup>
    </div>

    <swiper auto loop height="45vw"
            :interval="3000" :duration="1000" :show-dots="false">
      <swiper-item v-for="(banner,index) in bannerList" :key="index">
        <section class="item" v-for="(item,i) in banner" :key="i">
          <img class="itemImg" :src="item.image_hash | imageHash" alt="">
          <p class="itemName" v-text="item.name"></p>
        </section>
      </swiper-item>
    </swiper>
    <!--横幅广告-->
    <div id="adBanner">
      <swiper auto loop height="25vw" width="100vw"
              :interval="2500" :duration="1000" :show-dots="false">
        <swiper-item v-for="(ad,index) in adBanner" :key="index">
          <img class="adImg" :src="ad.image_hash | bigImageHash" alt="">
        </swiper-item>
      </swiper>
    </div>

    <Divider id="vux-divider">推荐商家</Divider>
    <section id="selectBar">
      <div>综合排序</div>
      <div>距离最近</div>
      <div>品质联盟</div>
      <div>筛选</div>
    </section>
    <Divider v-show="status=='fail'">定位后显示商品详情</Divider>
    <main>
      <!--@click.native 给组件添加点击事件-->
      <shop v-for="(shopInfo,index) in shopListInfo"
            :key="index" :shopInfo="shopInfo.restaurant"
            @click.native="goToDetail(shopInfo.restaurant.id)"></shop>
    </main>
    <p v-show="status=='loading'">
      <load-more tip="正在加载" :show-loading="true"></load-more>
    </p>
  </div>
</template>

<script>
  import homeHeader from '../components/home/homeHeader'
  import position from './position'
  import shop from '../components/home/shopItem'
  import {Divider, Popup, Swiper, SwiperItem} from 'vux'
  import bus from '../js/bus.js'

  export default {
    name: "",
    data() {
      return {
        positionIsShow: false,
        address: "",
        latitude: 34.74725,
        longitude: 113.624931,
        bannerList: [],
        adBanner:[],
        page: 0,
        shopListInfo: [],
        status: "fail",
        //是否加载更多
        loadingMore: false
      }
    },
    components: {
      homeHeader,
      position,
      shop,
      Popup,
      Swiper,
      SwiperItem,
      Divider
    },
    mounted() {
      this.getBannerData();
      this.getShopListInfo();
      this.getadBanner();

      //position页面点击首页，取消定位页面
      bus.$on("positioncancel", this.positionMove);
      bus.$on("backhome", this.positionMove);

      function addEvent(obj, eventStr, callback) {
        if (obj.addEventListener) {
          // 大部分浏览兼容的方式
          obj.addEventListener(eventStr, callback, false);
        } else {
          // this是谁由调用方式 决定
          // callback.call(obj)
          // IE8及以下
          obj.attachEvent("on" + eventStr, function () {
            // 在匿名函数中调用回调函数
            callback.call(obj);
          });
        }
      };
      var _this = this;
      addEvent(window, 'scroll', _this.didscroll);
    },
    // position 页面过来后监听地址变化，重新请求数据
    watch: {
      address() {
        this.getBannerData();
        this.getShopListInfo();
      }
    },
    methods: {
      //获取banner数据
      getBannerData() {
        var _this = this;
        this.$http.get("/ele/restapi/shopping/v2/entries?latitude=" + this.latitude + "&longitude=" + this.longitude + "&templates[]=main_template").then(function (data) {
          var bannerData = data.body[0].entries;
          var tempArray = [];
          for (var index = 0; index < bannerData.length; index++) {
            var itemData = bannerData[index];
            tempArray.push(itemData);
            if (index == 9 || index == bannerData.length - 1) {
              _this.bannerList.push(tempArray);
              tempArray = [];
            }
          }
          _this.status = "success";
        }, function (err) {
          _this.status = "fail"
        })
      },
      //获取广告图
      getadBanner(){
        this.$http.get("/ele/restapi/shopping/v2/banners?consumer=1&type=1&latitude="+this.latitude+"&longitude="+this.longitude).then(function (data) {
          this.adBanner=data.body;
          console.log(data);
        })
      },
      //显示定位页面
      newLocation() {
        this.positionIsShow = true;
      },
      //取消定位页面
      positionMove() {
        this.positionIsShow = false;
      },

      //position页面传过来的值
      getNewAddress: function (value) {
        //获取最新的经度
        this.latitude = value.latitude;
        //获取最新的维度
        this.longitude = value.longitude;
        this.address = value.address;
        this.positionIsShow = false;

        bus.$emit("autochange", value);

      },
      //获取商家列表信息
      getShopListInfo() {
        //offset 从第几页开始显示
        // limit 每页显示多少条
        var _this = this;
        this.$http.get("/ele/restapi/shopping/v3/restaurants?latitude=" + this.latitude + "&longitude=" + this.longitude + "&offset=" + this.page + "&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5").then(function (value) {
          _this.shopListInfo = value.body.items;
          _this.status = "success";
          // console.log(_this.shopListInfo);
        }, function (err) {
          _this.status = "fail";
        })
      },

      didscroll: function () {
        // 获取当前页面滚动距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 获取内容高度
        var contentHeight = document.body.clientHeight;
        // 获取当前屏幕的高度
        var windowHeight = window.innerHeight;
        if (scrollTop + windowHeight > contentHeight - 60) {
          // 说明滚动条已经在下方，而且现在没有再加载更多的内容
          if (this.loadingMore == false) {
            this.loadMore();
          }
        }
      },
      //加载更多
      loadMore: function () {
        this.status = "loading"
        this.loadingMore = true;
        this.page += 8;

        var _this = this;
        var url = "/ele/restapi/shopping/v3/restaurants?latitude=" + this.latitude + "&longitude=" + this.longitude + "&offset=" + this.page + "&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5";
        this.$http.get(url).then(function (data) {
          // 合并两个数组
          _this.shopListInfo = _this.shopListInfo.concat(data.body.items);
          _this.status = "success";
          _this.loadingMore = false;
          console.log(_this.shopListInfo);
        }, function (err) {
          _this.status = "fail"
        })
      },
      goToDetail(value) {
        //跳转到详情页，把id值传过去
        this.$router.push({path: "/detail", query: {id:value}})
      }
    }
  }
</script>

<style scoped>
  #vux-divider {
    width: 50vw;
    margin: 0 auto;
  }

  .item {
    display: inline-block;
    width: 20vw;
    height: 50%;
    text-align: center;
    padding-top: 2vw;
  }

  .itemImg {
    width: 13vw;
    height: 13vw;
    vertical-align: bottom;
  }
  #adBanner{
    padding: 2vw;
  }
.adImg{
  width: 100vw;
  height: 100%;
}
  .itemName {
    margin: 2vw 0;
    font-size: 3vw;
  }

  #selectBar {
    width: 100vw;
    height: 14vw;
    /*当距离上面不为0的时候，sticky的定位relative的定位一样；
    当距离屏幕上方为0的时候，定位效果等同于fixed*/
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background-color: #FFffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }

</style>
