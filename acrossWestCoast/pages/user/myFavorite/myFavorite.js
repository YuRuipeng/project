var utils = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:'',
    page: 1,
    totalCount:''
  },
  toNewsDel:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/indexDetails/indexDetails?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.http(app.d.ceshiUrl + '/wxxcx/news/getCollectionList', { session_id: app.globalData.userInfo.sessionId,page:that.data.page},function(res){
      console.log(res)
      if (res.data.err_code !== 0){
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      }else{
        utils.showHideLoading()
        for (var k in res.data.data.list) {
          utils.getLocalTime(res.data.data.list[k].create_time)
          res.data.data.list[k].create_time = utils.getLocalTime(res.data.data.list[k].create_time)
        }
        var page = res.data.data.page
        var lists = res.data.data.list
        var totalCount = res.data.data.totalCount
        
        that.setData({
          page: page,
          lists: lists,
          totalCount: totalCount
        })
        console.log(that.data.totalCount)
      } 
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
    var that = this;
    utils.http(app.d.ceshiUrl + '/wxxcx/news/getCollectionList', { session_id: app.globalData.userInfo.sessionId, page: that.data.page }, function (res) {
      console.log(res)
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        utils.showHideLoading()
        for (var k in res.data.data.list) {
          utils.getLocalTime(res.data.data.list[k].create_time)
          res.data.data.list[k].create_time = utils.getLocalTime(res.data.data.list[k].create_time)
        }
        var page = res.data.data.page
        var lists = res.data.data.list
        var totalCount = res.data.data.totalCount
        that.setData({
          page: page,
          lists: lists,
          totalCount: totalCount
        })
      }
    })
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var _page = that.data.page + 1
    utils.http(app.d.hostUrl + '/wxxcx/news/getCollectionList', { session_id: app.globalData.userInfo.sessionId, page: _page }, function (res) {
      if (JSON.stringify(res.data.data.list) == '{}') {
        wx.showToast({
          title: '没有更多了',
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        var a = that.data.lists;
        var b = res.data.data.list;
        for (var k in b) {
          if (b.hasOwnProperty(k) === true) {
            a[k] = b[k]
          }
        }
        utils.showHideLoading();
        that.setData({
          page: _page,
          lists: a
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})