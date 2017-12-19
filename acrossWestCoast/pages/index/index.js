var utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,//tab索引
    lists: [],//列表数据
    tree: [],//分类数据
    page: 1,//页码
    totalCount: 0//资讯总数
  },
  //跳转详情
  detail: function (e) {
    var that = this; //保存this指向
    var id_del = e.currentTarget.dataset.id; //获取自定义属性
    //保留当前页面，跳转到指定页面，navigateTo可以使用navigateback返回，其余跳转页面方式不可以
    wx.navigateTo({
      url: '../index/indexDetails/indexDetails?id=' + id_del,//跳转页面传值
    })
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    utils.showHideLoading();//tab切换loading提示
    if (that.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
    var Cid = e.currentTarget.dataset.c; //获取到自定义属性，此为分类id
    utils.http(app.d.hostUrl + '/wxxcx/news/index', { session_id: app.globalData.userInfo.sessionId, c_id: Cid }, function (event) {
      //重置数据
      that.setData({
        Cid: Cid,
        lists: event.data.data.list,//资讯内容
        page: event.data.data.page,//重置页码（如果不在此重置页码会导致下拉触底加载只能触发一次）
        totalCount: event.data.data.totalCount//资讯总数
      })
    })
  },
  //滚动加载数据(采用的是scroll-view内的bindscrolltolower方法，缺点是触底时会多次触发事件)
  scrolltolower: function (e) {
    var that = this;
    var _page = that.data.page + 1;//触底时页码加1
    //调取接口
    utils.http(app.d.hostUrl + '/wxxcx/news/index', { session_id: app.globalData.userInfo.sessionId, page: _page, c_id: that.data.Cid }, function (res) {
      if (JSON.stringify(res.data.data.list) == '{}') {//这种判断方式是判断对象是否为空
        wx.showToast({
          title: '没有更多了',
          image: '../../images/icon/icon_tanhao.png'
        })
      } else {
        var a = that.data.lists; //定义a为data内的数据列表
        var b = res.data.data.list; //定义b为接口内的数据列表
        //将接口内的数据列表合并到data内的数据列表
        for (var k in b) {
          if (b.hasOwnProperty(k) === true) { //hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。如果有，返回true，否则返回false。
            a[k] = b[k]
          }
        }
        utils.showHideLoading();
        that.setData({
          page: _page,//重置页码（如果不在此重置页码，下一次触底页码就不会加1）
          lists: a,
          // isHideLoadMore: true, 
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.http(app.d.hostUrl + '/wxxcx/news/index', { session_id: app.globalData.userInfo.sessionId, c_id: that.data.Cid, }, function (event) {
      if (event.data.err_code !== 0) {
        wx.showToast({
          title: event.data.err_msg,
          image: '../../images/icon/icon_tanhao.png'
        })
      } else {
        var page = event.data.data.page;
        var obj = event.data.data.tree;//定义obj为分类列表，此时obj为对象
        var arr = [];
        //将分类列表数据转化为数组
        for (var i in obj) {
          arr.push(obj[i])
        }
        that.setData({
          tree: arr,//顶部分类列表
          lists: event.data.data.list,//资讯列表
          page: page,//页码
          totalCount: event.data.data.totalCount//资讯总数
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
  onReachBottom: function (e) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})