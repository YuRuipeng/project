//微博主页添加微博的发布页面
var utils = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],//图片路径
    imgLength: 0,//图片数量
    httpImg: [],//图片数量
    content: '',//评论文本内容
    imgId: [],//图片id（数组）
    imgIdStr: '',//图片id(字符串)
  },
  //添加图片
  addImg: function () {
    var that = this
    wx.chooseImage({//选择图片
      count: 9,//可以选择几张图片，最小为1，最多为9
      sizeType: ['original', 'compressed'],//可以指定是原图还是压缩图
      sourceType: ['album', 'camera'],//可以指定来源是相册还是相机
      success: function (res) { //返回成功
        var tempFilePaths = res.tempFilePaths // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.data.imgLength = tempFilePaths.length + that.data.imgLength//最终上传的图片数量
        for (var i = 0; i < tempFilePaths.length; i++) {//遍历图片
          wx.uploadFile({//图片上传
            url: app.d.ceshiUrl + '/core/file/uploadpicture',
            filePath: tempFilePaths[i],//文件路径
            name: 'file',
            formData: {},
            success: function (res) {
              var obj = JSON.parse(res.data)//转换为json数据
              that.data.httpImg.push(obj["data"]["file"])//将数据添加到httpImg
              that.data.imgId.push(obj["data"]["file"].id)
              that.setData({
                imgIdStr: that.data.imgId.join(","),
                imgLength: that.data.imgLength
              })
            }
          })
        }
        var timeS = 0 //设置基本时间
        var timeOut = setInterval(function () {
          if (that.data.imgLength == that.data.httpImg.length) {//如果最终上传的图片数量等于数据中的图片数量，就重置数据中的图片
            that.setData({
              tempFilePaths: that.data.httpImg,
            })
            wx.hideLoading()//隐藏showLoading
            clearInterval(timeOut) //结束setInterval方法
          } else {
            if (timeS > 30) {
              wx.showToast({
                title: '上传失败',
              })
              clearInterval(timeOut)
            } else {
              wx.showLoading({
                title: '正在上传',
              })
            }
          }
          timeS++//每隔一秒timeS就加1
        }, 1000)
      }
    })
  },
  //绑定文本内容
  BindInputTap: function (e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  //发布微博（返回微博文本内容和添加的图片id）
  doSend: function () {
    var that = this;
    utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doSend', { session_id: app.globalData.userInfo.sessionId, content: that.data.content, attach_ids: that.data.imgIdStr }, function (event) {
      if (event.data.err_code !== 0) {
        wx.showToast({
          title: event.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
      } else {
        var w_id = event.data.data.weibo_id
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/interact/interact',
          })
        }, 1000)
      }
    })
  },
  //点击取消返回
  navigateBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //删除图片功能
  saveImgDel:function(e){
    var that = this
    wx.showModal({
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.tempFilePaths.length; i++) {
            if (e.currentTarget.id == that.data.tempFilePaths[i].id) {//设置id等于图片id，如果此id等于图片id，则删除此图片路径以及data中imgId中它的图片id
              that.data.tempFilePaths.splice(i, 1)
              that.data.imgId.splice(i, 1)
              that.data.imgLength = that.data.tempFilePaths.length 
              //重置数据
              that.setData({
                tempFilePaths: that.data.tempFilePaths,
                httpImg: that.data.tempFilePaths,
                imgIdStr: that.data.imgId.join(","),
                imgId: that.data.imgId,
                imgLength: that.data.imgLength
              })
            }
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      httpImg: [],
      T_id: options.id,
      name: options.name
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