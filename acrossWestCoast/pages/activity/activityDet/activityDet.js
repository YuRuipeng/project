var utils = require('../../../utils/util.js');
var app = getApp();
const wxParser = require('../../../wxParser/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''//富文本内容
  },
  //跳转提交信息页面
  checkJoin:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../../../doSign/doSign?id='+id,
    })
  },
  //跳转参加人员列表
  toMemberList:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../../../memberList/memberList?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.http(app.d.hostUrl + '/wxxcx/event/xcxDetail', { session_id: app.globalData.userInfo.sessionId, id: options.id},function(res){
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      }
      var content = res.data.data.content;
      var create_time = res.data.data.content.create_time;//活动创建时间
      var deadline = res.data.data.content.deadline;//报名结束时间
      var eTime = res.data.data.content.eTime;//活动结束时间
      var sTime = res.data.data.content.sTime;//活动开始时间
      var update_time = res.data.data.content.update_time;//报名开始时间
      var newsDate = new Date();//获取到当前时间
      var timestamp = Date.parse(new Date(newsDate));//转化为时间戳
      timestamp = timestamp / 1000;//接口传过来的时间戳是十位的，我们获取的是十三位的，所以要除以1000
      //重置到data数据中，方便在wxml中做判断
      that.setData({
        deadline: deadline,
        eTime: eTime,
        timestamp: timestamp,
      })
      if (eTime < timestamp){
        that.setData({
          state:'已结束'
        })
      } else if (eTime >= timestamp){
        that.setData({
          state: '进行中'
        })
      }
      //格式化时间，getLocalTimeS方法精确到分
      utils.getLocalTimeS(res.data.data.content.create_time)
      res.data.data.content.create_time = utils.getLocalTimeS(res.data.data.content.create_time)
      utils.getLocalTimeS(res.data.data.content.deadline)
      res.data.data.content.deadline = utils.getLocalTimeS(res.data.data.content.deadline)
      utils.getLocalTimeS(res.data.data.content.eTime)
      res.data.data.content.eTime = utils.getLocalTimeS(res.data.data.content.eTime)
      utils.getLocalTimeS(res.data.data.content.sTime)
      res.data.data.content.sTime = utils.getLocalTimeS(res.data.data.content.sTime)
      utils.getLocalTimeS(res.data.data.content.update_time)
      res.data.data.content.update_time = utils.getLocalTimeS(res.data.data.content.update_time)

      that.setData({
        content: content,
        check_isSign: res.data.data.check_isSign//是否报名，返回true和false
      })
      //富文本编辑
      wxParser.parse({
        bind: 'richText',
        html: content.explain,
        target: that,
        enablePreviewImage: false, // 禁用图片预览功能
      });
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