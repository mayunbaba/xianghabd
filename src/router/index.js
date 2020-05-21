import Vue from 'vue'
import VueRouter from 'vue-router'

let Home = () => import('../views/app/Home.vue')
let Classify = () => import('../views/app/Classify.vue')
let Comment = () => import('../views/app/Comment.vue')
let User = () => import('../views/app/User.vue')

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
    path: '/classify',
    name: 'Classify',
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
// 前置守卫（hook）
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

export default router
