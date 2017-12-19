var utils = require('../../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
    utils.http(app.d.hostUrl + '/wxxcx/event/memberList', { session_id: app.globalData.userInfo.sessionId, id: options.id,},function(res){
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../../images/icon/icon_tanhao.png'
        })
      }
      that.setData({
        menber: res.data.data.menber,//报名人员列表数据
        page: res.data.data.page,//报名人员列表页码
        all_count: res.data.data.all_count//报名成员总数
      })
    })
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
    var that = this
    var _page = that.data.page +1
    utils.http(app.d.hostUrl + '/wxxcx/event/memberList', { session_id: app.globalData.userInfo.sessionId, page:_page,id:that.data.id},function(res){
      if (res.data.data.menber == false) {
        wx.showToast({
          title: '没有更多了',
          image: '../../../../images/icon/icon_tanhao.png'
        })
      } else {
        wx.showLoading({
          title: '正在加载',
        })
        that.setData({
          page: _page,
          lists: that.data.menber.concat(res.data.data.menber)
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})