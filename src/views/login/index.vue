<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    >
      <template #left>
       <van-icon name="cross" @click="$router.back()"/>
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <!-- ref要绑定在父组件上 -->
    <van-form @submit="onSubmit" ref="loginForm">
        <!-- 用户名 -->
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="用户名"
          :rules="userFormRules.mobile"
          type="number"
          maxlength=11
        >
          <template #left-icon>
            <i class="iconfont icon-shouji"></i>
          </template>
        </van-field>
        <!-- 密码 -->
        <van-field
          v-model="user.code"
          name="mobile"
          placeholder="验证码"
          :rules="userFormRules.code"
           type="number"
          maxlength=6
        >
          <template #left-icon>
            <i class="iconfont icon-yanzhengma"></i>
          </template>
          <template #button>
            <van-count-down :time="1000*5" v-if="isCountDownShow" @finish="isCountDownShow=false" format="ss s"/>
            <van-button v-else class="send-sms-btn" size="small" @click="onSendSms" native-type="button">发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true, message: '请输入手机号'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '请输入正确的手机号'
        }],
        code: [{
          required: true, message: '请输入验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '请输入正确的验证码'
        }]
      },
      isCountDownShow: false

    }
  },
  methods: {
    async onSubmit () {
      // 获取信息
      // 发送请求
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 响应数据后再做处理
      try {
        const res = await login(this.user)
        console.log('请求成功', res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')

        // 暂时的写法
        this.$router.back()
      } catch (error) {
        this.$toast.fail('登陆失败')
        console.log('请求错误', error)
      }
    },
    async onSendSms () {
      // 判断手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('手机格式有误', error)
      }
      // 验证通过显示倒计时
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container{
    .iconfont{
      font-size: 37px;
    }
    .send-sms-btn{
      width: 152px;
      height: 46px;
      line-height: 46px;
      background-color: #ededed;
      font-size: 22px;
      color: #666;
    }
    .login-btn-wrap {
      padding: 53px 33px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
      }
    }
  }
</style>
