var utils = require('../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contents:[],//活动内容
    selected: true,//tab状态
    selected1: false,//tab状态
  },

 //跳转到活动详情页面
  toXcxDetail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;//活动id
    wx.navigateTo({
      url: '../activity/activityDet/activityDet?id=' + id + '&state_s=' + that.data.state_s + '&state_e=' + that.data.state_e,
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    utils.http(app.d.hostUrl + '/wxxcx/event/index', { session_id: app.globalData.userInfo.sessionId},function(res){
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../images/icon/icon_tanhao.png'
        })
      }
      var contents = res.data.data.contents//活动列表
      var select_type = res.data.data.select_type//活动是否进行，返回underway和end
      if (select_type == "underway"){
        that.setData({
          select:'进行中'
        })
      } else if (select_type == "end"){
        that.setData({
          select: '已结束'
        })
      }
      that.setData({
        contents: contents,//活动列表数据
        page: res.data.data.page,//活动列表页码
        select_type: select_type//活动是否进行，返回underway和end
      })
    })
  },
  /** 
   * 点击tab切换 （此页面选项卡顶部为固定内容，切换选项卡的点击事件是分开写的）
   */
  swichNav1: function (e) {//此为活动进行中的点击事件
    var that = this;
    utils.showHideLoading();
    that.setData({//这是判断选项卡切换的依据
      selected1: false,
      selected: true
    })
    var select_type = "underway"
    that.setData({
      select_type: select_type,
      select: '进行中'
    })
    utils.http(app.d.hostUrl + '/wxxcx/event/index', { session_id: app.globalData.userInfo.sessionId, select_type: that.data.select_type}, function (res) {
      var contents = res.data.data.contents
      that.setData({
        contents: contents,
        page: res.data.data.page
      })
    })
  },
  swichNav2: function (e) {//此为活动已结束的点击事件
    var that = this;
    utils.showHideLoading();
    that.setData({
      selected: false,
      selected1: true
    })
    var select_type = "end"
    that.setData({
      select_type: select_type,
      select: '已结束'
    })
    utils.http(app.d.hostUrl + '/wxxcx/event/index', { session_id: app.globalData.userInfo.sessionId, select_type: that.data.select_type }, function (res) {
      var contents = res.data.data.contents
      that.setData({
        contents: contents,
        page: res.data.data.page
      })
    })
  },
  // endDetail:function(){
  //   wx.showToast({
  //     title: '活动已结束',
  //     image: '../../images/icon/icon_tanhao.png'
  //   })
  // },
  //滚动加载
  scrolltolower:function(){
    var that = this;
    var _page = that.data.page + 1;
    utils.http(app.d.hostUrl + '/wxxcx/event/index', { session_id: app.globalData.userInfo.sessionId, page: _page }, function (res) {
      console.log(res)
      if (res.data.data.contents == null) {
        wx.showToast({
          title: '没有更多了',
          image: '../../images/icon/icon_tanhao.png'
        })
      } else {
        utils.showHideLoading();
        that.setData({
          page: _page,
          contents: that.data.contents.concat(res.data.data.contents)
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
