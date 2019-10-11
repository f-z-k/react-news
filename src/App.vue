<style>
  * {
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  body {
    background-color: #f2f2f2;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  .el-menu {
    border: 0px;
  }
</style>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default{
  data () {
    return {
    }
  }
}
</script>
