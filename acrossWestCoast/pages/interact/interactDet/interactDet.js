var utils = require('../../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topic_id: '',//话题id
    topic:[],//话题主题
    lists:'',//话题列表
  },
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
    })
  },
  //跳转评论页面传值
  toCommit: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id; //同样获取自定义属性id,该id同样是该微博id
    that.setData({
      id_Com: id
    })
    //保留当前页面，跳转到应用内的某个非tabBar页面。
    wx.navigateTo({
      url: '/pages/comment/topiComment/topiComment?id=' + id + '&D_id=' + that.data.topic_id
    })
  },
  //删除评论
  delComments: function (e) {
    var that = this;
    var comment_id = e.currentTarget.dataset.id //同样获取自定义属性id,该id同样是该微博id
    that.setData({
      comment_id: comment_id
    })
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
  //删除微博
  doDelWeibo: function (e) {
    var that = this
    var id_wei = e.currentTarget.dataset.id
    that.setData({
      id_wei: id_wei
    })
    wx.showModal({
      title: '删除',
      content: '确认删除吗？',
      success: function (ress) {
        if (ress.confirm) {
          utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doDelWeibo', { weibo_id: that.data.id_wei, session_id: app.globalData.userInfo.sessionId }, function (res) {
            console.log(res)
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
  //预览图片
  previewImage: function (e) {
    var that = this;
    that.setData({
      id_pre: e.currentTarget.dataset.id
    })
    var idx = 'list_' + that.data.id_pre;
    var urls = [];
    for (var i = 0; i < that.data.lists[idx].images.length; i++) {
      urls.push(that.data.lists[idx].images[i].big)
      if (that.data.lists[idx].images.length == urls.length) {
        wx.previewImage({
          current: e.currentTarget.dataset.src,
          urls: urls,
        })
      }
    }
  },
  //跳转发布微博页面
  toTopic:function(e){
    var that = this
    var T_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment/topic/topic?id=' + T_id + '&name=' + that.data.topic.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var topic_id = options.id
    that.setData({
      topic_id: topic_id
    })
    utils.http(app.d.ceshiUrl + '/wxxcx/topic/index', { session_id: app.globalData.userInfo.sessionId, topic_id: that.data.topic_id},function(res){
      if (res.data.err_code!==0){
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      }else{
        for (var k in res.data.data.weibo_list) {
          utils.getLocalTime(res.data.data.weibo_list[k].create_time)
          res.data.data.weibo_list[k].create_time = utils.getLocalTime(res.data.data.weibo_list[k].create_time)
        }
        that.setData({
          topic: res.data.data.topic,
          lists: res.data.data.weibo_list,
          total_count: res.data.data.total_count
        })
        //自定义头部导航内容
        wx.setNavigationBarTitle({
          title: '#' + res.data.data.topic.name + '#'
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
  onShow: function (options) {
    var that = this;
    utils.http(app.d.ceshiUrl + '/wxxcx/topic/index', { session_id: app.globalData.userInfo.sessionId, topic_id: that.data.topic_id }, function (res) {
      if (res.data.err_code !== 0) {
        wx.showToast({
          title: res.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        for (var k in res.data.data.weibo_list) {
          utils.getLocalTime(res.data.data.weibo_list[k].create_time)
          res.data.data.weibo_list[k].create_time = utils.getLocalTime(res.data.data.weibo_list[k].create_time)
        }
        that.setData({
          topic: res.data.data.topic,
          lists: res.data.data.weibo_list,
          total_count: res.data.data.total_count
        })
        //自定义头部导航内容
        // wx.setNavigationBarTitle({
        //   title: '#' + res.data.data.topic.name + '#'
        // })
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
    wx.showLoading({
      title: '正在加载...',
      duration: 1000
    })
    utils.http(app.d.ceshiUrl + '/wxxcx/topic/loadweibo', {lastId:that.data.listId,session_id: app.globalData.userInfo.sessionId}, function (res) {
      wx.hideLoading()
      console.log(res)
      for (var i in res.data.data.list) {
        utils.getLocalTime(res.data.data.list[i].create_time)
        res.data.data.list[i].create_time = utils.getLocalTime(res.data.data.list[i].create_time)
      }
      var a = that.data.lists
      var b = res.data.data.list
      for (var k in b) {
        if (b.hasOwnProperty(k) === true) {
          a[k] = b[k]
        }
      }
      that.setData({
        lists: a,
        lastId: res.data.data.lastId,
      })
      if (that.data.lastId == null) {
        wx.showToast({
          title: '没有更多了',
          image: '../../../images/icon/icon_tanhao.png'
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