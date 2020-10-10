import Layout from '@/components/main'

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../views/Login'),
    },
    {
        path: '/other', // 点击侧边栏跳到一个单独的路由页面，需要定义，层级和其他顶级路由一样
        name: 'other',
        meta: { title: '单独的路由' },
        component: () => import('../views/Other'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../views/404'),
    },
    {   path: '/home',
        name:'Home',
        meta: { title:'Home' },
        component: () => import('../components/main'),
    },
    {   path: '/',
        redirect: '/home' 
    },
]

export default commonRoutes;