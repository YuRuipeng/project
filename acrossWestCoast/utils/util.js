var app = getApp()


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  // var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getLocalTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString()
} 
function getLocalTimeS(date) {
  var year = new Date().getFullYear()
  var month = new Date().getMonth() + 1
  var day = new Date().getDate()
  var hour = new Date().getHours()
  var minute = new Date().getMinutes()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
} 
// http
function http(url,data,callback,error){
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded' 
    },
    method:'post',
    data: data,
    success: callback,
    fail: error
  })
}
function showHideLoading(){
  wx.showLoading({
    title: '正在加载中...',
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 1000)
}

module.exports = {
  formatTime: formatTime,
  http:http,
  getLocalTime: getLocalTime,
  getLocalTimeS: getLocalTimeS,
  showHideLoading: showHideLoading
}
