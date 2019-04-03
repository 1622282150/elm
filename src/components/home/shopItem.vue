<template>
  <!--商家信息-->

    <div class="shop">
      <img class="shopPic" :src="shopInfo.image_path | imageHash" alt="">
      <section class="shopInfo">
        <div class="shopName">
          <!--品牌-->
          <div>
            <span class="brand" v-if="shopInfo.is_premium">品牌</span>
            <h4 v-text="shopInfo.name"></h4>
          </div>
          <span class="ad" v-if="shopInfo.recommend.is_ad"
                v-text="shopInfo.recommend.reason" style="z-index: -1"></span>
        </div>
        <!--评分-->
        <div class="recent_order">
          <div>
            <span class="star">✩✩✩✩✩ &nbsp;</span>
            <span v-text="shopInfo.rating"></span>
            <span style="color: #333333"> &nbsp;月售{{shopInfo.recent_order_num}}单</span>
          </div>
          <!--蜂鸟专送-->
          <div v-if="shopInfo.delivery_mode" v-text="shopInfo.delivery_mode.text"
               :style="{'color':'#ffffff','backgroundColor':'#'+shopInfo.delivery_mode.color,
             'padding':'1px 2px','borderRadius':'3px'}"></div>
        </div>

        <div class="distance">
          <div>
            <!--起送价格-->
            <span>￥{{shopInfo.float_minimum_order_amount}}起送</span>
            <span style="color: #E1E1E1;margin:0 2px">|</span>
            <!--配送费-->
            <span v-text="shopInfo.piecewise_agent_fee.description"></span>
          </div>
          <div>
            <!--配送距离-->
            <span>{{shopInfo.distance | addUnit}}</span>
            <span style="color: #E1E1E1;margin:0 2px">|</span>
            <!--配送时间-->
            <span v-text="shopInfo.order_lead_time+'分钟'"></span>
          </div>
        </div>

        <div class="tag">
          <span v-for="(tag,index) in shopInfo.support_tags" :key="index" v-text="tag.text"></span>
          <div v-if="shopInfo.recommend.reason=='口碑人气好店'">
            <img :src="shopInfo.recommend.image_hash | imageHash" alt="">
            <span v-text="shopInfo.recommend.reason"></span>
          </div>
        </div>

        <!--活动-->
        <div class="actives">
          <div  v-for="(active,index) in shopInfo.activities" :key="index">
            <div class="act">
            <span v-if="active.is_exclusive_with_food_activity && index<2 || allIsShow"
                  v-text="active.icon_name"
                  :style="{backgroundColor:'#'+active.icon_color,color:'#fff',
                  'padding':'0px 2px'}"></span>
              <span v-if="active.is_exclusive_with_food_activity && index<2 || allIsShow"
                    v-text="active.description" class="tips"></span>
            </div>
            <!--活动数-->
            <div v-if="index==0 && shopInfo.activities.length>2" @click.stop="showAllActive">
              <span v-text="shopInfo.activities.length+'个活动'"></span>
              <span :style="arrowStyle" class="fa fa-caret-down"></span>
            </div>
          </div>
        </div>

      </section>
    </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        allIsShow: false
      }
    },
    props: ["shopInfo"],
    methods: {
      showAllActive() {
        this.allIsShow = !this.allIsShow;
      }
    },
    computed: {
      arrowStyle() {
        return {
          transition: "all 0.5s",
          transform: this.allIsShow ? "rotate(180deg)" : "rotate(0deg)"
        }
      }
    },
    filters:{
    //  追加单位
      addUnit(value){
        if(value<1000){
          return value+"m";
        }
        return (value/1000).toFixed(2)+"km";
      }
    }
  }
</script>

<style scoped>
  .shop {
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    /*border: 1px solid red;*/
    padding: 3vw 2vw;
    border-bottom: 1px solid #eeeeee;
  }

  .shopPic {
    width: 20vw;
    height: 20vw;
    border: 1px solid #eeeeee;
    margin-right: 2vw;
  }

  .shopInfo {
    width: 75vw;
    font-size: 3.2vw;
    color: #666666;
  }

  /*品牌*/
  .brand {
    font-size: 3.5vw;
    background-color: #FFEE0B;
    color: #6F3F15;
    padding: 0px 2px;
    margin-right: 1vw;
    border-radius: 2px;
    vertical-align: bottom;
  }
.shopName,.tag{
  display: flex;
  justify-content: flex-start;
}
.shopName > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50vw;
  white-space: nowrap;
}

.shopName h4 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  font-size: 4vw;
  color: #333333;
}

.shopName .ad {
  font-size: 2vw;
  width: 6vw;
  height: 3vw;
  line-height: 3vw;
  color: #eeeeee;
  border: 1px solid #dddddd;
  position: relative;
  left: 5vw;
}

.shopInfo div.recent_order,
.shopInfo div.distance,
.shopInfo div.actives >div {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.recent_order .star {
  color: #FFBD00;
  font-size: 5vw;
}
  .tag{
    margin: 1vw 0;
  }
.tag img {
  width: 3vw;
  height: 3vw;
  margin-left:5px;
}

.tag > span {
  font-size: 3.2vw;
  color: #666666;
  border-radius: 2px;
  border: 1px solid #dddddd;
  margin-right: 1vw;
}

.tag div span {
  font-size: 3.2vw;
  color: #E8470B;
}

  .tips {
    margin-left: 3px;
    width: 52vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .act{
    width: 52vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
