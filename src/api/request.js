import {Service} from './service.js'

export function GetTest(){
    return Service({
        url:'/api/hello',
        method:'get'
    })
}

export function GetMenu(){
    return Service({
        url:'/api/menu',
        method:'get'
    })
}