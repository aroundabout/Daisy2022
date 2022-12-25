import axios from 'axios'

//获取token，用来渲染用户信息
export function getToken() {
  return localStorage.getItem('token')
}

//设置token，登陆时调用
export function setToken(token, account) {
  const usertoken = {
    token: token,
    expire: new Date().getTime() + 1000 * 60 * 60, //60分钟有效期
  }
  localStorage.setItem('token', JSON.stringify(usertoken))
  getUserInfor(account)
}

//判断是否是登陆状态
export function isLogined() {
  const storage = JSON.parse(localStorage.getItem('token'))
  const time = new Date().getTime()
  let result = false
  if (storage) {
    if (time < storage.expire) {
      result = true
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
    }
  }
  return result
}

//退出登录
export function clearToken() {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
}

//获取用户的各种信息
export function getUserInfor(account) {
  var token = JSON.parse(localStorage.getItem('token')).token
  axios
    .get('user/profile', { headers: { token: token } })
    .then(function (response) {
      console.log(response)
      var data = response.data.detail
      data['account'] = account
      localStorage.setItem('userData', JSON.stringify(data))
    })
    .catch(function (error) {
      console.log(error)
    })
}
