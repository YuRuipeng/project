var utils = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic_id: '',//话题id
    topic: [],//话题主题
    lists:[],
    page: 1,
    // total_count: ''
  },
  /**
  * 功能描述：点赞功能
  * data参数：id
  * 接口参数：
  * sessionId - 可往app.js中取公共的变量
  * weibo_id - 微博评论id,其实也就是微博id
  * row - 微博id
  **/
  clickzan: function (e) {
    var that = this; //保存this指向
    that.setData({
      id: e.currentTarget.dataset.id //获取自定义id,此id与微博id相等
    })
    utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doSupport', { session_id: app.globalData.userInfo.sessionId, weibo_id: that.data.id, row: that.data.id }, function (res) {
      //lists是一个object,它的索引就是它的微博id
      var idx = 'list_' + that.data.id
      //替换原本lists内is_support与supported的点赞数据，is_support是判断是否点赞
      that.data.lists[idx].is_support = res.data.data.is_support;
      that.data.lists[idx].supported = res.data.data.supportedUserList;
      //重置微博列表数据，使其在页面上显示
      that.setData({
        lists: that.data.lists
      })
      console.log(that.data.lists)
    })
  },
  /**
  * 功能描述：跳转评论页面传值功能
  * data参数：id_Com
  * 接口参数：无
  **/
  toCommit: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id; //同样获取自定义属性id,该id同样是该微博id
    that.setData({
      id_Com: id
    })
    //保留当前页面，跳转到应用内的某个非tabBar页面。
    wx.navigateTo({
      url: '/pages/comment/intComment/intComment?id=' + id + '&D_id=' + that.data.topic_id
    })
  },
  /**
  * 功能描述：删除评论功能
  * data参数：comment_id
  * 接口参数：
  * sessionId - 可往app.js中取公共的变量
  * comment_id - 微博评论id,其实也就是微博id
  **/
  delComments: function (e) {
    var that = this;
    var comment_id = e.currentTarget.dataset.id //同样获取自定义属性id,该id同样是该微博id
    that.setData({
      comment_id: comment_id
    })
    //底部弹出框
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: '#e11414',
      success: function (ress) {
        utils.http(app.d.ceshiUrl + '/wxxcx/weibo/delComment', { session_id: app.globalData.userInfo.sessionId, comment_id: that.data.comment_id }, function (res) {
          for (var k in that.data.lists) {
            for (var v in that.data.lists[k].comments) {
              if (that.data.lists[k].comments[v].id == e.currentTarget.dataset.id) {
                that.data.lists[k].comments[v] = '';
              }
            }
          }
          that.setData({
            lists: that.data.lists
          })
        })
      },
    })
  },
  /**
  * 功能描述：删除微博功能
  * data参数：id_wei
  * 接口参数：
  * sessionId - 可往app.js中取公共的变量
  * weibo_id - 微博id
  **/
  doDelWeibo: function (e) {
    var that = this
    var id_wei = e.currentTarget.dataset.id
    that.setData({
      id_wei: id_wei
    })
    //模态框
    wx.showModal({
      title: '删除',
      content: '确认删除吗？',
      success: function (ress) {
        if (ress.confirm) {
          utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doDelWeibo', { weibo_id: that.data.id_wei, session_id: app.globalData.userInfo.sessionId }, function (res) {
            for (var k in that.data.lists) {
              if (that.data.lists[k].id == that.data.id_wei) {
                that.data.lists[k] = ''
              }
            }
            that.setData({
              lists: that.data.lists
            })
          })
        } else if (ress.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
  * 功能描述：预览图片功能
  * data参数：id_pre
  * 接口参数：无
  **/
  previewImage: function (e) {
    var that = this;
    that.setData({
      id_pre: e.currentTarget.dataset.id //自定义属性id，等同于微博id
    })
    var idx = 'list_' + that.data.id_pre;
    var urls = [];
    for (var i = 0; i < that.data.lists[idx].images.length; i++) {
      urls.push(that.data.lists[idx].images[i].big)
      if (that.data.lists[idx].images.length == urls.length) {
        wx.previewImage({
          current: e.currentTarget.dataset.src,//该预览的图片路径
          urls: urls,//所有将要预览的图片路径，stringArray形式
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.http(app.d.hostUrl + '/wxxcx/weibo/myXcxWeibo', { session_id: app.globalData.userInfo.sessionId,page:that.data.page},function(res){
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      }else{
        //格式化时间
        for (var k in res.data.data.list) {
          utils.getLocalTime(res.data.data.list[k].create_time)
          res.data.data.list[k].create_time = utils.getLocalTime(res.data.data.list[k].create_time)
        }
        that.setData({
          lists: res.data.data.list,
          page: res.data.data.page,
          total_count: res.data.data.total_count
        })
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
    var that = this;
    utils.http(app.d.hostUrl + '/wxxcx/weibo/myXcxWeibo', { session_id: app.globalData.userInfo.sessionId, page: that.data.page }, function (res) {
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        //格式化时间
        for (var k in res.data.data.list) {
          utils.getLocalTime(res.data.data.list[k].create_time)
          res.data.data.list[k].create_time = utils.getLocalTime(res.data.data.list[k].create_time)
        }
        that.setData({
          lists: res.data.data.list,
          page: res.data.data.page,
          total_count: res.data.data.total_count
        })
      }
    })
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
    var that = this;
    var _page = that.data.page + 1;
    utils.http(app.d.hostUrl + '/wxxcx/weibo/myXcxWeibo', { session_id: app.globalData.userInfo.sessionId, page: _page }, function (res) {
      console.log(res)
      if (JSON.stringify(res.data.data.list) == '{}') {
        wx.showToast({
          title: '没有更多了',
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        //格式化时间
        for (var k in res.data.data.list) {
          utils.getLocalTime(res.data.data.list[k].create_time)
          res.data.data.list[k].create_time = utils.getLocalTime(res.data.data.list[k].create_time)
        }
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