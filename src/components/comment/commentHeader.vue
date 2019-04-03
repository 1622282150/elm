<template>
  <nav>
    <span class="fa fa-angle-left" @click="goHome"></span>
    <span>
      <slot></slot>
    </span>
    <span>&nbsp;</span>
  </nav>
</template>

<script>
  import bus from '../../js/bus.js'
  export default {
    name: "",
    methods:{
     goHome(){
       bus.$emit("backhome")
     }
    },

  }
</script>

<style scoped>
nav{
  width: 100vw;
  height: 12vw;
  padding: 0 2vw;
  background-image: linear-gradient(90deg,#0af,#0085ff);
  color: #FFffff;
  font-size: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
}
  span.fa{
    font-size: 7vw;
  }
</style>
