<template>
  <div class="my-container">
    <!-- 已登录 -->
    <header class="user-info" v-if="$store.state.user" >
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            :src="userInfo.photo||'https://img01.yzcdn.cn/vant/cat.jpeg'"
          />
          <span class="name">{{userInfo.name||'myname'}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-items">
          <span class="count">{{userInfo.art_count||0}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-items">
          <span class="count">{{userInfo.follow_count||0}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-items">
          <span class="count">{{userInfo.fans_count||0}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-items">
          <span class="count">{{userInfo.like_count||0}}</span>
          <span class="text">头条</span>
        </div>
      </div>
    </header>
    <!-- 未登录 -->
    <header class="noLogin" v-else >
      <div class="login-btn" @click="$router.push('/login')">
        <img class="img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </header>

    <!-- 宫格 -->
    <van-grid :column-num="2" clickable class="nav-van-grid">
      <van-grid-item>
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell-group class="nav-cell-group">
      <van-cell title="消息通知"  is-link/>
      <van-cell title="小智同学"  is-link/>
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button block v-if="$store.state.user" @click="onLogout">退出登录</van-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  created () {
    // 初始化的时候，如果用户登录了，我才请求获取当前登录用户的信息
    if (this.$store.state.user) {
      this.loadUser()
    }
  },
  methods: {
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // on confirm
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    },
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .my-container{
    header{
      height: 361px;
      background:url("~@/assets/banner.png") no-repeat;
      background-size: cover;
    }
    .noLogin{
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img{
        height: 132px;
        width: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-style: 28px;
        color: #fff;
      }
    }
    }
    // 登陆后
    .user-info{
      .base-info{
        box-sizing: border-box;
        height: 231px;
        padding: 76px 32px 23px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          display: flex;
          align-items: center;
          .avatar{
          height: 132px;
          width: 132px;
          border: 1px solid #fff;
          margin-right: 23px;
          }
          .name{
            font-size: 30px;
            color: #fff;
          }
        }
      }
      .data-stats{
        display: flex;
        .data-items{
          flex: 1;
          height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count{
            font-size: 36px;
          }
          .text{
            font-size: 23px;
          }
        }
      }
    }
    // 宫格
    .nav-van-grid{
      margin-bottom: 20px;
      .iconfont{
        font-size: 45px;
      }
      .icon-shoucang{
        color: #eb5253;
      }
      .icon-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
      }
    }
    // 单元格
    .nav-cell-group{
      margin-bottom: 20px;
      .van-cell{
        font-size: 28px;
      }
    }
    // 退出登录
    .van-button__text{
              color: #eb5253;
    }

  }
</style>
