import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)


export const asyncRoutes = {
  home: {
      path: 'home',
      name: 'home',
      meta: { title: '主页' },
      component: () => import('../views/Home'),
  },
  table: {
      path: 'table',
      name: 'table',
      meta: { title: '表格' },
      component: () => import('../views/Table'),
  },
  password: {
      path: 'password',
      name: 'password',
      meta: { title: 'Password' },
      component: () => import('../views/Password'),
  },
  Echarts: {
    path: 'password',
    name: 'password',
    meta: { title: 'Echarts' },
    component: () => import('../views/Echarts'),
  },
  msg: {
      path: 'msg',
      name: 'msg',
      meta: { title: '通知消息' },
      component: () => import('../views/Msg'),
  },
  userinfo: {
      path: 'userinfo',
      name: 'userinfo',
      meta: { title: '用户信息' },
      component: () => import('../views/UserInfo'),
  }
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//修复路由重复push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

//重置路由
const createRouter = () => new VueRouter({
  routes: routes,
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
