import Mock from 'mockjs'

import hello from './data/hello'
import menu from './data/menuData'

Mock.mock('/api/hello', 'get', hello)
Mock.mock('/api/menu', 'get', menu)