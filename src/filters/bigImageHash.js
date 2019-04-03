import Vue from 'vue'


var bigImageHash = Vue.filter("bigImageHash", function (value) {
  value = String(value);
  var newSrc = "https://fuss10.elemecdn.com/";
  newSrc += value.substr(0, 1) + "/";
  newSrc += value.substr(1, 2) + "/";
  newSrc += value.substr(3) + ".";
  var type = value.substr(-3);
  if (type == "peg") {
    type = "jpeg";
  }
  newSrc += type;
  newSrc += "?imageMogr/thumbnail/750x/";
  // console.log(newSrc);
  return newSrc;
})

export default bigImageHash;
