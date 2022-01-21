<template>
  <div class="home-container">
    <!-- 导航栏 -->
     <van-nav-bar
      class="page-nav-bar "
    >
      <template #title>
        <van-button class="search-btn" size="small" type="info" icon="search" round>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- Tab组件 -->
    <van-tabs class="channel-tabs" v-model="active" :animated="true" :swipeable="true">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
            <ArticalList :channel="chanel"></ArticalList>
      </van-tab>
      <!-- <van-tab title="11">
        <ArticalList :channel="fchanel[0]"></ArticalList>
      </van-tab> -->
      <div class="placeholder" slot="nav-right"></div>
      <div class="hamburger-btn" slot="nav-right">
        <van-icon class="iconmore" name="ellipsis" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticalList from './components/ArticalList.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 2,
      channels: [],
      fchanel: [{ id: 1 }, { id: 2 }]
    }
  },
  components: {
    ArticalList
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/.channel-tabs{
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tab{
      width: 204px;
      height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #ccc;
    }
    .van-tab--active{
      color: black;
    }
    .van-tabs__line{
      height: 6px;
      width: 31px;
      bottom: 8px;
      background-color: #3296fa;
    }
  }

  .placeholder {
   //“flex-shrink:0”可以用于防止控件压缩变形
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  .iconmore {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
}
</style>
