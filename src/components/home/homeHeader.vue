<template>
  <div>
    <header>
      <p @click="getLocation" v-cloak>
        <span class="fa fa-map-marker"></span>
        <span id="title" v-text="address"></span>
        <span class="fa fa-caret-down"></span>
      </p>
      <div id="search">
        <span class="fa fa-search"></span>
        搜索饿了么商家、商品名称
      </div>
    </header>
  </div>
</template>

<script>
  import bus from '../../js/bus.js'

  export default {
    name: "",
    data() {
      return {
        address: "",
        latitude: 34.74725,
        longitude: 113.624931
      }
    },
    methods: {
      autoGetLocation() {
        // https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding?latitude=34.863765&longitude=113.6478361
        var _this = this;
        this.$http.get("/ele/restapi/bgs/poi/reverse_geo_coding?latitude=" + this.latitude + "&longitude=" + this.longitude).then(function (data) {
          _this.address = data.body.name;
        }, function (err) {
          console.log(err);
        })
      },
      getLocation() {
        this.$emit("myLocation")
      },
      newaddress(value) {
        this.address = value.name;
        this.latitude = value.latitude;
        this.longitude = value.longitude;
      }
    },
    mounted() {
      this.autoGetLocation();
      bus.$on("autochange", this.newaddress)
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }

  header {
    background-image: linear-gradient(90deg, #0af, #0085ff);
    padding: 4vw 3vw 2vw;
    font-weight: bold;

  }

  p {
    width: 60vw;
    margin-top: 2vw;
    color: #FFffff;
  }

  #title {
    display: inline-block;
    max-width: 50vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    top: 1vw;
  }

  #search {
    width: 100%;
    height: 10vw;
    line-height: 10vw;
    text-align: center;
    font-size: 3.5vw;
    background-color: #FFffff;
    color: #999999;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
</style>
