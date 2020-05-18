// 二次封装的请求方法
const BASEURL = "http://192.168.0.121:3000/api/" // 线下地址
// const BASEURL = "http://192.168.0.103:3000/api/" // 线下地址
// const BASEURL = "http://47.113.113.117/api/" // 线上地址
import { getCookie, delCookie } from './cookie'

const axios = require('axios');
axios.defaults.withCredentials=true;

export function getBaseUrl(){
  return BASEURL
}

export function Axios({ url, data, method = 'POST' }, flag = true ) {

  return new Promise((resolve, reject) => {
    axios({
      url: BASEURL + url,
      data,
      method,
      withCredentials: false,
      header: {
        'content-type':'application/json',
      },
    }).then(res => {
        if(200 == res.status){
            // 检测token 无效
            if(506 == res.data.code){
                delCookie('token')
                console.log(window.location.origin)
                return false
            }
            // 其他状态码
            resolve(res.data)
        }else{
            reject(res)
        }
    }).catch(err => {
        reject(err)
    })
  })
}
