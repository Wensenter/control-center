import { resetRouter } from '@/router'

export function reserTokenAndClearUser() {
    //退出登录 清除用户资料
    localStorage.setItem('token','')
    localStorage.setItem('userImg','')
    localStorage.setItem('userName','')
    // 重设路由
    resetRouter()
}

export const defaultDocumentTitle = 'vue-admin-template'
export function getDocumentTitle(pageTitle) {
    if (pageTitle) return `${defaultDocumentTitle} - ${pageTitle}`
    return `${defaultDocumentTitle}`
}