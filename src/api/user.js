import request from '../utils/request'
// import store from "../store/index";

// 登录功能
export const login = (data) => request({
  url: '/app/v1_0/authorizations',
  method: 'POST',
  data
})

// 验证码功能
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // headers: {
    // 注意：该接口需要授权才能访问
    //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    // Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
