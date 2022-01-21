import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
// 导入二级组件
import Home from '@/views/second/home'
import My from '@/views/second/my'
import Qa from '@/views/second/qa'
import Video from '@/views/second/video'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/layout',
    // name: 'layout',
    component: Layout,
    children: [
      { path: '/', redirect: 'home' },
      { path: 'home', component: Home },
      { path: 'my', component: My },
      { path: 'qa', component: Qa },
      { path: 'video', component: Video }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
