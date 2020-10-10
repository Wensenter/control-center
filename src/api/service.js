import axios from 'axios'

const ConfigBaseURL = 'http://localhost:8080'

export const Service = axios.create({
    baseURL: process.env.NODE_ENV != 'development' ? ConfigBaseURL : '',
    // headers:{
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // },
    method:'post'
})

Service.interceptors.request.use(config=>{
  return config
})

Service.interceptors.response.use(response=>{
  return response.data
},error=>{
  console.error(error)
  return Promise.reject(error)
})