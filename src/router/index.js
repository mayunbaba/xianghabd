import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/app/Home.vue')
const Classify = () => import('../views/app/Classify.vue')
const Comment = () => import('../views/app/Comment.vue')
const User = () => import('../views/app/User.vue')

const Video = ()=> import('../views/app/home/Video')
const Skill = ()=> import('../views/app/home/Skill')
const Recom = ()=> import('../views/app/home/Recom')
const Hot = ()=> import('../views/app/home/Hot')



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
      keepAlive: true
    },
    children:[
      // {
      //   path: '',
      //   redirect: 'news'
      // },
      {
        path: 'video',
        component: Video,
      },
      {
        path: 'skill',
        component: Skill,
      },
      {
        path: 'recom',
        component: Recom,
      },
      {
        path: 'hot',
        component: Hot,
      },
    ]
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
  routes,
})
// 前置守卫（hook）
// router.beforeEach((to, from, next) => {
//   // document.title = to.meta.title;
//   next();
// })

export default router
