var utils = require('../../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",//姓名
    phone:""//电话
  },
  //绑定姓名input框内的内容
  bindname:function(e){
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  //绑定电话input框内的内容
  bindphone: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  submit:function(e){
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(that.data.name==""){
      wx.showToast({
        title: '姓名不能为空哟',
        image: '../../../../images/icon/icon_tanhao.png'
      })
    } else if (that.data.phone == ""){
      wx.showToast({
        title: '手机号不能为空哟',
        image: '../../../../images/icon/icon_tanhao.png'
      })
    } else if (!myreg.test(that.data.phone)){
      wx.showToast({
        title: '手机号格式错误哟',
        image: '../../../../images/icon/icon_tanhao.png'
      })
    }else {
      utils.http(app.d.hostUrl + '/wxxcx/event/doSign', { session_id: app.globalData.userInfo.sessionId, id: that.data.id, name: that.data.name, phone: that.data.phone }, function (res) {
        if (res.data.err_code !== 0){
          wx.showToast({
            title: res.data.err_msg,
            image: '../../../../images/icon/icon_tanhao.png'
          })
        }else{
          wx.showToast({
            title: '报名成功',
          })
          setTimeout(function () {
             //关闭所有页面，跳转到指定页面（此方法只能通过手机的返回键才能返回到上一页面）
            wx.reLaunch({
              url: '../../activityDet/activityDet?id=' + that.data.id,
            })
          }, 1000)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      id: options.id
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