<template>
  <div class="layout-container">
      <!-- 路由出口 -->
    <router-view></router-view>
      <!-- /路由出口 -->

      <!-- 底部导航栏 -->
    <van-tabbar class="layout-tabbar" v-model="active" route :placeholder="true">
        <van-tabbar-item to="/layout/home">
            <span class="text">首页</span>
            <template #icon>
                <i class="iconfont icon-shouye"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/qa">
            <span class="text">问答</span>
            <template #icon>
                <i class="iconfont icon-pinglun"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/video">
            <span class="text">视频</span>
            <template #icon>
                <i class="iconfont icon-shouji"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/layout/my">
            <span class="text">{{$store.state.user?'我的':"未登录"}}</span>
            <template #icon>
                <i class="iconfont icon-wode"></i>
            </template>
        </van-tabbar-item>
    </van-tabbar>
      <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
