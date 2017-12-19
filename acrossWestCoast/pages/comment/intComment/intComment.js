//我的互动内的评论页面
var utils = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weibocontent: '',//评论文本内容
    D_id: ''//话题id
  },
  //绑定文本内容
  BindInputTap: function (e) {
    var that = this
    that.setData({
      weibocontent: e.detail.value
    })
  },
  //发布评论
  toSend: function () {
    var that = this
    utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doaddcomment', { session_id: app.globalData.userInfo.sessionId, weibocontent: that.data.weibocontent, weiboId: that.data.id }, function (res) {
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      }else{
        wx.showToast({
          title: '评论成功',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      D_id: options.D_id,//话题id
      id: options.id,//微博id
    })
  },
  navigateBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})