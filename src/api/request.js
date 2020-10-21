import {Service} from './service.js'

export function GetMenu(){
    return Service({
        url:'/api/menu',
        method:'get'
    })
}

export function GetUserInfo(data){
    return Service({
        url:'/api/userInfo',
        data,
        method:'post'
    })
}

export function fetchUserData(){
    return Service({
        url:'/api/userData',
        method:'get'
    })
}