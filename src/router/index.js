import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const Classify = () => import('../views/Classify.vue')
const Comment = () => import('../views/Comment.vue')
const User = () => import('../views/User.vue')





Vue.use(VueRouter)


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '香哈菜谱',
    },
  },
  {
    path: '/classify',
    name: 'Classify',
    component: Classify,
    meta: {
      title: '分类',
    }
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: {
      title: '消息',
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '我的',
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
// 前置守卫（hook）
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

export default router
