import Mock from 'mockjs'

import userInfo from './data/userInfo'
import menu from './data/menuData'
import userData from './data/userData'

Mock.mock('/api/menu', 'get', menu)
Mock.mock('/api/userInfo','post', function(option){
    let o = JSON.parse(option.body)
    if(o.account == 'admin' && o.pwd == 'admin'){
        return Mock.mock(userInfo)
    }
})
Mock.mock('/api/userData','get', userData)