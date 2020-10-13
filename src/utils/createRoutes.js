import { asyncRoutes } from '@/router'

// 将菜单信息转成对应的路由信息 动态添加
export default function createRoutes(data) {
    const result = []
    const children = []

    result.push({
        path: '/',
        component: () => import('../components/main'),
        children,
    })

    data.forEach(item => {
        generateRoutes(children, item)
    })

    // 最后添加404页面 否则会在登录成功后跳到404页面
    // 路由没有强匹配就会跳转 '/404'
    result.push(
        {path: '*', redirect: '/404'},
    )
}

function generateRoutes(children, item) {
    if (item.name) {
        if (asyncRoutes[item.name]) children.push(asyncRoutes[item.name])
    } else if (item.children) {
        item.children.forEach(e => {
            generateRoutes(children, e)
        })
    }
}