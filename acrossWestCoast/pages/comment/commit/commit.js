//微博主页的评论页面
var utils = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weibocontent:'',//评论文本内容
    D_id:''//微博id
  },
  //绑定文本内容
  BindInputTap: function (e) {
    var that = this
    that.setData({
      weibocontent: e.detail.value
    })
  },
  //发送评论（返回文本内容和微博id）
  toSend:function(){
    var that = this
    utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doaddcomment', { session_id: app.globalData.userInfo.sessionId, weibocontent: that.data.weibocontent, weiboId: that.data.D_id},function(res){
      wx.showToast({
        title: '评论成功',
      })
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/interact/interact?id' + that.data.D_id,
        })
      }, 1000)
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      D_id: options.id
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