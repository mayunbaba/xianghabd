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
      keepAlive: true
    },
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
    },
    // beforeEnter(to, from, next) {
    //   if (store.state.userInfo.code) {
    //     next();
    //   } else {
    //     next('/login');
    //   }
    // }
  },
  {
    path: '/login/:prepath',
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
  if (from.meta.keepAlive) {
    let scroll = {
      x: document.documentElement.scrollLeft,
      y: document.documentElement.scrollTop
    }
    store.commit('setScroll', {
      key: from.name,
      value: scroll
    })
  }
  if (to.name == 'User') {
    if (!store.state.userInfo.code) {
      router.push('/login/'+encodeURIComponent(to.path));
    }
  }
  document.title = to.meta.title;
  next();

})

router.afterEach((to) => {
  if (to.meta.keepAlive && store.state.scroll[to.name]) {
    setTimeout(() => {
      window.scroll(store.state.scroll[to.name].x, store.state.scroll[to.name].y);
    });
  }
})

export default router
