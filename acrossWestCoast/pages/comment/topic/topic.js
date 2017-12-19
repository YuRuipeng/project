//话题内的发布微博页面
var utils = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],//图片路径
    imgLength: 0,
    httpImg: [],
    content: '',//评论文本内容
    imgId:[],
    imgIdStr:'',
  },
  addImg: function () {
    var that = this
    wx.chooseImage({//选择图片
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) { //返回成功
        var tempFilePaths = res.tempFilePaths
        that.data.imgLength = tempFilePaths.length + that.data.imgLength
        for (var i = 0; i < tempFilePaths.length; i++) {//遍历图片
          wx.uploadFile({//图片上传
            url: app.d.ceshiUrl + '/core/file/uploadpicture',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {},
            success: function (res) {
              var obj = JSON.parse(res.data)//转换为json数据
              console.log(obj["data"]["file"])
              that.data.httpImg.push(obj["data"]["file"])//将数据添加到httpImg
              that.data.imgId.push(obj["data"]["file"].id)
              that.setData({
                imgIdStr: that.data.imgId.join(",")
              })
            }
          })
        }
        var timeS = 0 //设置基本时间
        var timeOut = setInterval(function () {
          if (that.data.imgLength == that.data.httpImg.length) {
            that.setData({
              tempFilePaths: that.data.httpImg,
              imgLength: that.data.imgLength
            })
            wx.hideLoading()
            clearInterval(timeOut)
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
          timeS++
        }, 1000)
      }
    })
  },
  BindInputTap:function(e){
    var that= this
    that.setData({
      content: e.detail.value
    })
  },
  //发布微博
  doSend:function(){
    var that = this;
    utils.http(app.d.ceshiUrl + '/wxxcx/weibo/doSend',{ session_id: app.globalData.userInfo.sessionId, content: that.data.content, attach_ids: that.data.imgIdStr},function(event){
      if (event.data.err_code !== 0) {
        wx.showToast({
          title: event.data.err_msg,
          image: '../../../images/icon/icon_tanhao.png'
        })
        console.log(event.data.err_msg)
      }else{
        var w_id = event.data.data.weibo_id
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function () {
          // wx.redirectTo({

            // url: '/pages/interact/interactDet/interactDet?id=' + that.data.T_id + '&w_id=' + w_id,
            // success:function(e){
            //   var page = getCurrentPages().pop();
            //   if( page == undefined || page == null) return;
            //   page.onLoad();
            // }
          // })
          wx.navigateBack({
            delta: 1
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
  saveImgDel: function (e) {
    var that = this
    wx.showModal({
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.tempFilePaths.length; i++) {
            // console.log(that.data.tempFilePaths[i].id)
            if (e.currentTarget.id == that.data.tempFilePaths[i].id) {
              that.data.tempFilePaths.splice(i, 1)
              that.data.imgId.splice(i, 1)
              that.data.imgLength = that.data.tempFilePaths.length 
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
      httpImg:[],//图片路径
      T_id: options.id,//话题id
      name: options.name//话题标题
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