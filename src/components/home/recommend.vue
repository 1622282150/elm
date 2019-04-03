<template>
  <div>
    <!--广告-->
    <div id="ad" v-if="dJson.rst.posters[0].image_hash">
      <img :src="dJson.rst.posters[0].image_hash | bigImageHash" alt="">
    </div>
    <div class="recommend">
      <h3>商家推荐</h3>
      <scroller lock-y :scrollbar-x=false>
        <div class="food_box" :style="widthStyle">
          <div class="food_box_item" v-for="(recommend,index) in dJson.recommend[0].items" :key="index">
            <img :src="recommend.image_path | bigImageHash">
            <p class="rec_name" v-text="recommend.name"></p>
            <p class="satisfy_rate">
              <span v-text="'月售'+recommend.month_sales"></span>
              <span v-text="'好评'+recommend.satisfy_rate+'%'"></span>
            </p>
            <div class="rec_price">
              <div class="shop_price" v-text="'￥'+(recommend.specfoods[0].price).toFixed(2)+'元'"></div>
              <div class="price_count">
                <div class="price_add">+</div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <!--主要菜单-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="content">
            <!--左边菜单-->
            <div class="left">
              <ul>
                <li v-for="(item,index) in dJson.menu" :key="index">
                  <img v-if="index<2" :src="item.grey_icon_url | imageHash" alt="">
                  <div v-text="item.name"></div>
                </li>
              </ul>
            </div>
            <!-- 右边商品-->
            <div class="right">
              <ul>
                <li v-for="item in dJson.menu">
                  <div class="class-title">
                    <span v-text="item.name" style="color: #666666;font-size: 3.2vw"></span>
                    <span v-text="item.description"></span>
                  </div>
                  <div v-for="ite in item.foods">
                    <div class="item">
                      <div class="item-left">
                        <img class="item-img" :src="ite.image_path | bigImageHash">
                      </div>
                      <div class="item-right">
                        <div class="title" v-text="ite.name"></div>
                        <div class="description" v-text="ite.description"></div>
                        <div class="subtitle">
                          <span v-text="'月售'+ite.month_sales+'份'"></span>
                          <span v-text="'好评率'+ite.satisfy_rate+'%'"></span>
                        </div>
                        <div class="price">
                          <div v-text="'￥'+ite.specfoods[0].price"></div>
                          <div class="price_count">
                            <div class="price_add">+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--购物车-->
    <div id="fooder">
      <div v-text="dJson.rst.activities[0].tips" id="tips"></div>
      <div></div>
      <div id="shopping_car">
        <div>
          <span  class="fa fa-shopping-cart" id="car"></span>
        </div>
        <div id="count_shopping">
          <div class="middle_pri">
            <div>未选购商品</div>
            <div v-text="'另需配送费'+dJson.rst.float_delivery_fee+'元'"></div>
          </div>
          <div id="shopping_price">￥15元起送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Scroller} from 'vux'

  export default {
    name: "",
    data() {
      return {}
    },
    components: {
      Scroller
    },
    props: ["dJson"],
    created() {
      $(function () {
        // $('.content').css('height',$('.right').height());
        // $('.left ul li').eq(0).addClass('active');
        $(window).scroll(function () {
          if ($(window).scrollTop() >= 600) {
            // $('.swiper-container-ul').css('position','fixed');
            $('.left').css('position', 'fixed');
            $('.right').css('margin-left', $('.left').width());
          } else {
            // $('.swiper-container-ul').css('position','');
            $('.left').css('position', '');
            $('.right').css('margin-left', '');
          }
          ;
          //滚动到标杆位置,左侧导航加active
          $('.right ul li').each(function () {
            var target = parseInt($(this).offset().top - $(window).scrollTop() - 150);
            var i = $(this).index();
            if (target <= 0) {
              $('.left ul li').removeClass('active');
              $('.left ul li').eq(i).addClass('active');
            }
          });
        });
        $('.left ul li').click(function () {
          var i = $(this).index('.left ul li');
          $('body, html').animate({scrollTop: $('.right ul li').eq(i).offset().top - 40}, 500);
        });
        $('.swiper-container-ul-li').click(function () {
          var index = $(this).index();
          if (index == 0) {
            $('.swiper-slide').eq(0).show();
            $('.swiper-container-ul-li').eq(0).addClass('actives');
            $('.swiper-slide').eq(1).hide();
            $('.swiper-container-ul-li').eq(1).removeClass('actives');
          } else {
            $('.swiper-slide').eq(0).hide();
            $('.swiper-container-ul-li').eq(0).removeClass('actives');
            $('.swiper-slide').eq(1).show();
            $('.swiper-container-ul-li').eq(1).addClass('actives');
          }
        });
      });
    },

    computed: {
      widthStyle() {
        return {
          width: 35 * this.dJson.recommend[0].items.length +
          3 * (this.dJson.recommend[0].items.length - 1) + 'vw'
        }
      }
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /*广告*/
  #ad {
    width: 100vw;
    height: 25vw;
    padding: 0 3vw;
    margin-top: 2vw;
  }

  #ad img {
    width: 100%;
    height: 100%;
    border-radius: 1vw;
  }

  /*商家推荐*/
  .recommend {
    padding: 1vw 3vw;
  }

  .recommend h3 {
    text-align: left;
    margin: 3vw 0;
  }

  .food_box {
    /*width: 1000px;*/
    display: flex;
    white-space: nowrap;
  }

  .food_box_item {
    width: 35vw;
    margin-left: 3vw;
    text-align: left;
  }

  .food_box_item:first-child {
    margin-left: 0;
  }

  .food_box_item img {
    width: 35vw;
    height: 35vw;
    border-radius: 5px;
  }

  .rec_name {
    font-size: 4.5vw;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .satisfy_rate {
    font-size: 3vw;
    color: #a2a2a2;
  }

  .rec_price {
    display: flex;
    justify-content: space-between;
    vertical-align: center;
  }

  .rec_price .shop_price {
    color: #FF573E;
    font-size: 4vw;
  }

  .price_count .price_add {
    width: 6vw;
    height: 6vw;
    line-height: 6vw;
    border-radius: 50%;
    text-align: center;
    font-size: 7vw;
    background-color: #2396FF;
    color: #FFffff;
  }

  /*主要菜单*/
  /*.actives{*/
  /*border-bottom: 1px solid #3190e8;*/
  /*color: #3190e8;*/
  /*}*/
  /*.swiper-container{*/
    /*margin-bottom: 30vw;*/
  /*}*/
  .content {
    width: 100vw;
    overflow: hidden;
    margin-top: 5vw;
  }

  .left {
    top: 41px;
    float: left;
    width: 25vw;
    height: 100%;
    overflow: scroll;
    background: #f8f8f8;
  }

  .left ul {
    list-style: none;
    padding-bottom: 20vw;
  }

  .left ul li {
    padding: 4vw 2vw;
    font-size: 3.2vw;
    display: flex;
    align-items: center;
  }

  .left ul li img {
    width: 3.5vw;
    height: 3.5vw;
    margin-right: 2vw;
  }

  .active {
    background: #fff;
    /*border-left: 2px solid #3190e8;*/
  }

  .right {
    float: left;
    width: 75%;
    height: 100%;
  }

  .right ul {
    list-style: none;
    margin-bottom: 10vw;
  }

  .class-title {
    padding: 3vw 0 3vw 2vw;
    font-size: 3vw;
    color: #a2a2a2;
  }

  .item {
    overflow: hidden;
    width: 100%;
    padding: 2vw;
    background: #fff;
  }

  .item-left {
    float: left;
  }

  .item-right {
    float: left;
    height: 25vw;
    padding-left: 1vw;
    position: relative;
  }

  .item-img {
    width: 25vw;
    height: 25vw;
  }

  .title {
    font-weight: bold;
    width: 40vw;
    min-width: 40vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description {
    font-size: 3.2vw;
    color: #a2a2a2;
    width: 40vw;
    min-width: 40vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 1vw 0;
  }

  .subtitle {
    font-size: 3.2vw;
    color: #a2a2a2;
    margin: 1vw 0;
  }

  .price {
    width: 42vw;
    height: 6vw;
    color: #FF573E;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }

  #fooder {
    width: 100vw;
    /*border: 1px solid red;*/
    position: fixed;
    bottom: 0;
    z-index: 100;
  }

  #tips {
    width: 100vw;
    height: 5vw;
    line-height: 5vw;
    font-size: 3vw;
    text-align: center;
    background-color: #FFFAD8;
  }
#shopping_car{
  height: 13vw;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  background-color: #5a5a5a;
}
#count_shopping{
  width: 80vw;
  padding: 2vw 5vw 2vw 0;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
}

  #car {
    display: block;
    font-size: 7vw;
    color: #5F5F63;
    width: 12vw;
    height: 12vw;
    line-height: 10vw;
    text-align: center;
    border-radius: 50%;
    background-color: #363636;
    border: 1.2vw solid #444444;
    margin: -2vw 0vw 0 2vw;
  }
  .middle_pri{
    color: #999999;
    font-size: 3.5vw;
  }
  #shopping_price{
    color: #ffffff;
    font-weight: bold;
    font-size: 4vw;
    line-height: 10vw;
  }
</style>
