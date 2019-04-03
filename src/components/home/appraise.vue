<template>
<div>
  <!--评分-->
  <div id="price">
    <div id="rating">
      <div v-text="dJson.rst.rating"></div>
      <div>
        <div>商家评分</div>
        <div> <span class="star">✩✩✩✩✩ &nbsp;</span></div>
      </div>
    </div>
    <div>
      <div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "",
    props:["dJson"]
  }
</script>

<style scoped>

</style>
