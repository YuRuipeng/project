// app.js
App({
  d: {
    hostUrl: 'https://xcx.dev.tvplaza.cn',
    hostImg: 'http://img.ynjmzb.net',
    hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    uid: 1,
    appId: "wx16231ad9090cd2ca",
    appKey: "09eda3f19175588456f56639e2379777",
    ceshiUrl: 'https://xcx.dev.tvplaza.cn'
  },
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs);
    this.globalData.sessionId = wx.getStorageSync('sessionId');
    // console.log(sessionId)
    // sessionId && (this.globalData.sessionId = sessionId);
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          //get wx user simple info
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log(res.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo);
              //get user sessionKey
              //get sessionKey
              that.onLoginUser(code, res);
            }
          });
        }
      });
    }
  },
  onLoginUser: function (code, userInfo) {
    var that = this;
    var request_data = {
      code: code,
      encryptedData: userInfo.encryptedData,
      iv: userInfo.iv,
    };
    if (this.globalData.sessionId) {
      request_data.session_id = this.globalData.sessionId;
    }
    wx.request({
      url: that.d.ceshiUrl + '/Wxxcx/Member/login.html',

      method: 'post',

      data: request_data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data;
        console.log(data)
        if (data.err_code !== 0) {
          wx.showToast({
            title: data.err_msg,
            duration: 2000,
            image: '../images/icon/icon_tanhao.png'
          });
          return false;
        }
        that.globalData.userInfo['sessionId'] = data.session_id;
        that.globalData.userInfo['openid'] = data.data.openid;
        that.globalData.userInfo['uid'] = data.data.uid;
        wx.setStorageSync("sessionId", data.session_id);
        // that.globalData.userInfo['NickName'] = data.NickName;
        // that.globalData.userInfo['HeadUrl'] = data.avatarUrl;
        // that.onLoginUser();
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:getsessionkeys',
          duration: 2000,
          image: '../images/icon/icon_tanhao.png'
        });
      },
    });
  },
  // 是否绑定手机号
  getOrBindTelPhone: function (returnUrl) {
    var user = this.globalData.userInfo;
    if (!user.tel) {
      wx.navigateTo({
        url: 'pages/binding/binding'
      });
    }
  },


  globalData: {
    userInfo: null,
    sessionId: null,

  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

});





