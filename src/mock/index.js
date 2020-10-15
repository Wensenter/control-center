import Mock from 'mockjs'

import userInfo from './data/userInfo'
import menu from './data/menuData'

Mock.mock('/api/menu', 'get', menu)
Mock.mock('/api/userInfo','post', function(option){
    console.log(option)
    return Mock.mock(userInfo)
})