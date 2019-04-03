import Vue from 'vue'


var imageHash = Vue.filter("imageHash", function (value) {
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
  newSrc += "?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/";
  // console.log(newSrc);
  return newSrc;
})

export default imageHash;
