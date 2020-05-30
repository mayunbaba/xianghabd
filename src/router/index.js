import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

const Home = () => import('../views/Home')
const Classify = () => import('../views/Classify')
const Comment = () => import('../views/Comment')
const User = () => import('../views/User')
const Login = () => import('../views/Login')
const Dish = () => import('../views/Dish')





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
    },
    beforeEnter(to,from,next){
      console.log(store.state.userInfo.code);
      if(store.state.userInfo.code){
        next();
      }else{
        next('/login');
      }
      console.log(to,from,next);
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
    }
  },
  {
    path: '/dish',
    name: 'Dish',
    component: Dish,
    meta: {
      title: '',
    }
  },
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
