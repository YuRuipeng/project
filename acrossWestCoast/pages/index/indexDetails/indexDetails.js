var utils = require('../../../utils/util.js');
var app = getApp();
const wxParser = require('../../../wxParser/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",//富文本内容
    uid: '',//用户Id
    comment: '',//用户评论内容
    lists: '',//评论列表
  
  },
  /**
   * 功能描述：资讯评论功能
   * data参数：id
   * 接口参数：
   **/
  pinglun: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id; //同样获取自定义属性id,该id同样是该资讯id
    that.setData({
      id_News: id
    })
    //关闭当前页面，跳转到应用内的某个非tabBar页面。
    wx.navigateTo({
      url: '/pages/comment/newsComment/newsComment?id=' + that.data.id_News
    })
  },
  /**
 * 功能描述：删除评论功能
 **/
  deleteComment: function (e) {
    var that = this;
    var del_id = e.currentTarget.dataset.id; //相当于评论id
    that.setData({
      del_id: del_id
    })
    //模态框
    wx.showModal({
      title: '删除',//标题
      content: '确认删除吗',//内容
      success: function (res) {
        if (res.confirm) {//点击确定时
          utils.http(app.d.hostUrl + '/wxxcx/news/deleteComment', { session_id: app.globalData.userInfo.sessionId, id: that.data.del_id }, function (ress) {
            var idx = e.currentTarget.id;//在wxml中设置了id（此id为id选择器）为评论列表的索引
            that.data.lists[idx] = ''//点击删除时，该索引下的评论数据为空
            that.setData({//重置评论列表数据
              lists: that.data.lists
            })
          })
        } else if (res.cancel) {//点击取消时
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击收藏
  doCollection: function (e) {
    var that = this;
    var id_Col = e.currentTarget.dataset.id;//该资讯id
    utils.http(app.d.hostUrl + '/wxxcx/news/doCollection', { session_id: app.globalData.userInfo.sessionId, row: id_Col }, function (res) {
      that.setData({
        is_collection: res.data.data.is_collection //是否收藏的判断依据，返回true和false
      })
    })
  },
  //点赞功能
  doSupport:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id; //同样获取自定义属性id,该id同样是该资讯id
    utils.http(app.d.hostUrl + '/wxxcx/news/doSupport', { session_id: app.globalData.userInfo.sessionId, row:id},function(res){
      that.setData({
        is_support: res.data.data.is_support,//是否点赞的判断依据，返回true和false
        suppore_count: res.data.data.suppore_count//点赞人数
      })
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    var id = options.id;//通过页面跳转所传的值会存在options中
    that.setData({
      id: id,//资讯id
      uid: app.globalData.userInfo['uid']//此为自己的id
    })
    utils.http(app.d.hostUrl + '/wxxcx/news/detail', { session_id: app.globalData.userInfo.sessionId, id: that.data.id }, function (res) {
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        var info = res.data.data.info;
        var content = res.data.data.info.detail.content;
        var comment = res.data.data.comment;//评论
        var page = res.data.data.comment.page;//评论页码
        //格式化时间
        utils.getLocalTime(res.data.data.info.create_time)
        res.data.data.info.create_time = utils.getLocalTime(res.data.data.info.create_time)
        for (var i = 0; i < res.data.data.comment.list.length; i++) {
          utils.getLocalTime(res.data.data.comment.list[i].create_time)
          res.data.data.comment.list[i].create_time = utils.getLocalTime(res.data.data.comment.list[i].create_time)
        }
        //重置数据
        that.setData({
          info: info,//页面详情
          comment: comment,//评论
          lists: res.data.data.comment.list,//评论列表
          page: page,//评论页码
          is_collection: res.data.data.is_collection,//是否收藏
          suppore_count: res.data.data.suppore_count,//点赞人数
          is_support: res.data.data.is_support,//是否点赞
          forward: res.data.data.info.forward//转发数量
        });
        //富文本编辑
        wxParser.parse({
          bind: 'richText',
          html: content,
          target: that,
          enablePreviewImage: false, // 禁用图片预览功能,false为开启功能
        });
      }
    })
    //显示转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function () {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    utils.http(app.d.hostUrl + '/wxxcx/news/detail', { session_id: app.globalData.userInfo.sessionId, id: that.data.id }, function (res) {
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        var info = res.data.data.info;
        var content = res.data.data.info.detail.content;
        var comment = res.data.data.comment;//评论
        var page = res.data.data.comment.page;//评论页码
        //格式化时间
        utils.getLocalTime(res.data.data.info.create_time)
        res.data.data.info.create_time = utils.getLocalTime(res.data.data.info.create_time)
        for (var i = 0; i < res.data.data.comment.list.length; i++) {
          utils.getLocalTime(res.data.data.comment.list[i].create_time)
          res.data.data.comment.list[i].create_time = utils.getLocalTime(res.data.data.comment.list[i].create_time)
        }
        //重置数据
        that.setData({
          info: info,//页面详情
          comment: comment,//评论
          lists: res.data.data.comment.list,//评论列表
          page: page,//评论页码
          is_collection: res.data.data.is_collection,//是否收藏
          suppore_count: res.data.data.suppore_count,//点赞人数
          is_support: res.data.data.is_support,//是否点赞
          forward: res.data.data.info.forward//转发数量
        });
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var _page = that.data.page + 1
    utils.http(app.d.hostUrl + '/wxxcx/news/getCommentList', { session_id: app.globalData.userInfo.sessionId, id: that.data.id, page: _page }, function (res) {
      if (res.data.data.list == false) {
        wx.showToast({
          title: '没有更多了',
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        utils.showHideLoading()
        that.setData({
          page: _page,
          lists: that.data.lists.concat(res.data.data.list)//这里的评论列表数据为数组
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      var share_id = res.target.dataset.id
      that.setData({
        share_id: share_id
      })
    }
    return {
      title: that.data.info.title,
      path: '/page/index/indexDetails/indexDetails?id='+that.data.info.id,
      success: function (res) {
        utils.http(app.d.hostUrl + '/wxxcx/news/setForward', { session_id: app.globalData.userInfo.sessionId, row: that.data.share_id},function(event){
          console.log(event.data)
          console.log(that.data.share_id)
          if (event.data.err_code!=0){
            wx.showToast({
              title: event.data.err_msg,
              image:'../../../images/icon/icon_tanhao.png'
            })
          }else{
            that.setData({
              forward: event.data.data.forward
            })
            wx.showToast({
              title: '转发成功',
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          image: '../../../images/icon/icon_tanhao.png'
        })
      }
    }
  }
})