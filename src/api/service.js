import axios from 'axios'
import {Message} from 'view-design'
import router from '@/router'
import {showLoading, closeLoading} from '@/utils/loading'
import { resetTokenAndClearUser } from '@/utils'

const ConfigBaseURL = 'http://localhost:8080'

export const Service = axios.create({
    baseURL: process.env.NODE_ENV != 'development' ? ConfigBaseURL : '',
    // headers:{
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // },
    method:'post'
})

Service.interceptors.request.use(config=>{
  showLoading()
  if(localStorage.getItem('token')){
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
},(error) => Promise.reject(error))

Service.interceptors.response.use(response=>{
  closeLoading()

  // 这里是接口处理的一个示范，可以根据自己的项目需求更改
    // 错误处理
  //   if (res.code != 0 && res.msg) {
  //     Message.error({
  //         content: res.msg,
  //     })

  //     // token 无效，清空路由，退出登录
  //     if (res.code == 2) {
  //         resetTokenAndClearUser()
  //         router.push('login')
  //     }

  //     return Promise.reject()
  // }
  const res = response.data

  return res
},error=>{
  closeLoading()
  if(error.name == 'Error') {
    Message.error({
      content: error.msg
    })
  } else {
    Message.error({
      content: error.response.data.data || error.message
    })
  }
  return Promise.reject(error)
})