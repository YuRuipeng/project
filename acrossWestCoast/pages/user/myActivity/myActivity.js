var utils = require('../../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contents: [],//活动内容
    selected: true,//tab状态
    selected1: false,//tab状态
    page: 1
  },
  //跳转活动详情
  toXcxDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/activityDet/activityDet?id=' + id
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    utils.http(app.d.hostUrl + '/wxxcx/event/myAttendEvent', { session_id: app.globalData.userInfo.sessionId,page:that.data.page }, function (res) {
      console.log(res)
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../images/icon/icon_tanhao.png'
        })
      }else{
        var contents = res.data.data.event_list
        var newsDate = new Date()
        var timestamp = Date.parse(new Date(newsDate))
        timestamp = timestamp / 1000
        that.setData({
          timestamp: timestamp
        })
        that.setData({
          contents: contents,
          page: res.data.data.page
        })
      }
    })
  },
  //滚动加载
  scrolltolower: function () {
    var that = this;
    var _page = that.data.page + 1;
    utils.http(app.d.hostUrl + '/wxxcx/event/myAttendEvent', { session_id: app.globalData.userInfo.sessionId, page: _page }, function (res) {
      console.log(res)
      if (JSON.stringify(res.data.data.event_list) == '{}') {
        wx.showToast({
          title: '没有更多了',
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        var a = that.data.contents;
        var b = res.data.data.event_list;
        for (var k in b) {
          if (b.hasOwnProperty(k) === true) {
            a[k] = b[k]
          }
        }
        utils.showHideLoading();
        that.setData({
          page: _page,
          contents: a
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
