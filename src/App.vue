<template>
  <div id="app">
    1232132
    <router-view/>
    <span class="iconfont icon-youjiantou"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <p class="title">asdkljsadlkj</p>
  </div>
</template>

<script>
export default {
  // why 起名字
  name: 'App'
}
</script>

<style lang="less">
  .title{
    font-size: 30px;
  }
</style>
