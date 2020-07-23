<template>
  <div class="footBottom">
    <p>COPYRIGHT &copy; ICP许可证：苏B2-20190525</p>
    <p>备案号：苏ICP备16066248号</p>
  </div>
</template>

<script>
    export default {
        name: "allFooter"
    }
</script>

<style scoped>
  .footBottom{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding-bottom: 10px;
    /*background: #596e79;*/
    background: #263859;
    text-align: center;
  }
  .footBottom p{
    margin-top: 10px;
    font-size: 12px;
    color: #fff;
  }
</style>
