import axios from 'axios';
import store from '../store';

let loading = false;
function request(config) {
  // 创建axios 实例
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })
  return checkToken().then(() => {
    return new Promise((resolve, reject) => {
      // 发送请求
      instance(config).then(res => {
        if (res && res.statusCode == 200 && res.data) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}
// 检查token是否合法
function checkToken() {
  return new Promise((resolve) => {
    if (store.state.token.data && store.state.token.time > new Date()) {
      resolve()
    } else {
      if (loading) {
        sleep(50).then(resolve);
      } else {
        getServiceToken().then(resolve);
      }
    }
  })
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// 服务端获取token
function getServiceToken() {
  loading = true;
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })
  return new Promise((resolve, reject) => {
    instance({
      url: '/common/public/auth/getToken',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'XH-Client-Data': JSON.stringify({
          appId: 2
        })
      }
    }).then(res => {
      loading = false;
      if (res.data.code === 10000) {
        store.commit("setToken", {
          data: res.data.data.token,
          time: new Date().getTime() + 1000 * 60 * 30
        })
        resolve();
      }else{
        reject();
      }
    })
  })

}



export {
  request
};