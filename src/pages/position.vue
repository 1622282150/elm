<template>
  <div id="location">
    <comment-header>选择收货地址</comment-header>
    <div id="searchBar">
       <span>郑州&#X3000;
       <span class="fa fa-caret-down"></span>
       </span>

      <div>
        <span class="fa fa-search"></span>
        <input type="text" v-model="keyWord" placeholder="请输入地址">
      </div>
    </div>
    <ul>
      <li v-for="(address,index) in addressList" :key="index" @click="select(index)">
        <div>
          <span v-text="address.name"></span>
          <span v-text="address.distance"></span>
        </div>
        <div v-text="address.address"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import commentHeader from "../components/comment/commentHeader"

  export default {
    name: "",
    data() {
      return {
        keyWord: "",
        addressList:[],
        latitude:34.74725,
        longitude:113.624931
      }
    },
    components: {
      commentHeader
    },
    watch: {
      keyWord: function () {
        this.getAllLocationWithKeyWord();
      }
    },
    methods: {
      select(index){
        this.keyWord="";
        var addressInfo=this.addressList[index];
        this.$emit("getnewaddress",addressInfo);
      },
      getAllLocationWithKeyWord() {
        var _this = this;
        // https://h5.ele.me/restapi/bgs/poi/search_poi_nearby_alipay?keyword=&offset=0&limit=20&latitude=34.74725&longitude=113.624931
        this.$http.get("/ele/restapi/bgs/poi/search_poi_nearby_alipay?keyword=" + this.keyWord + "&latitude="+this.latitude+"&longitude="+this.longitude).then(function (data) {
          _this.addressList=data.body;
        },function (err) {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #location {
    width: 100vw;
    position: absolute;
    top: 0;
  }

  #searchBar {
    width: 100vw;
    height: 15vw;
    background-color: #FFffff;
    padding: 0 2vw;
    margin-top: 12vw;
    font-size: 3.5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #searchBar > span {
    flex-basis: 20vw;
    text-align: center;
  }

  #searchBar > div {
    height: 9vw;
    line-height: 9vw;
    padding: 0 2vw;
    width: 70vw;
    color: #777777;
    font-weight: 100;
    background-color: rgba(242, 242, 242, 1);
  }

  #searchBar div input {
    height: 9vw;
    width: 60vw;
    vertical-align: bottom;
    border: none;
    background-color: rgba(242, 242, 242, 1);
  }

  #searchBar div input:focus {
    outline: none;
  }
  ul{
    padding: 0;
    margin: 0 0 18vw 0;
    list-style: none;
    background-color: #FFffff;
  }
  li{
    padding: 2vw 3vw;
    border-bottom: 1px solid #f2f2f2;
  }
  ul li>div:first-child{
    display: flex;
    justify-content: space-between;
    margin-bottom: 3vw;
  }
  ul li>div>span:first-child{
    font-weight:bold;
  }
  ul li>div>span:last-child{
    font-size: 3.6vw;
  }

  li>div:nth-child(2){
    font-size: 3.5vw;
  }
</style>
