import Vue from 'vue'
import VueRouter from 'vue-router'

let Home = () => import('../views/Home.vue')
let Classify = () => import('../views/Classify.vue')
let Comment = () => import('../views/Comment.vue')
let User = () => import('../views/User.vue')

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/calssify',
    name: 'Calssify',
    component: Classify,
    meta: {
      title: '分类',
      keepAlive: true
    }
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: {
      title: '消息',
      keepAlive: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '我的',
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes,
})
// 前后守卫（hook）
// router.beforeEach((to, from, next) => {
//   // document.title = to.matched[0].meta.title;
//   next();
// })

export default router
