//首页资讯详情内的评论页面
var utils = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',//评论内容
  },
  BindInputTap: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  toSend: function () {
    var that = this
    utils.http(app.d.hostUrl + '/wxxcx/news/addComment', { session_id: app.globalData.userInfo.sessionId, id: that.data.id, content: that.data.content}, function (res) {
      console.log(res)
      if(res.data.err_code!==0){
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
      id: options.id,//资讯id
    })
  },
  navigateBack: function () {
    var that = this
    //关闭当前页面，返回指定页面
    // wx.redirectTo({
    //   url: '/pages/index/indexDetails/indexDetails?id=' + that.data.id,
    // })
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