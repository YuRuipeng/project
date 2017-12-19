// pages/user/user.js
var app = getApp();
Page({
  data: {
    userInfo:{},
    array:[{
      imgs: '../../images/icon/icon_my3.png',
      title: '我的互动',
      navig: '../../../myInteractive/myInteractive'
    },{
      imgs: '../../images/icon/icon_my4.png',
      title: '我的收藏',
      navig: '../../../myFavorite/myFavorite'
    }]
  },
  makePhoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '0631-8888888',
    })
  },
  toSuggestion:function(){
    wx.navigateTo({
      url: '../../../myActivity/myActivity',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        loadingHidden: true
      })
    });
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
