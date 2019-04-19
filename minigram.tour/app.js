//app.js
var config = require('config.js')
var api = require('/utils/promise.js');

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/authorize/authorize',
          })
        }
      }
    });
  },


  //获取用户信息
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  getSystemInfo: function(cb) {
    var that = this
    if (that.globalData.systemInfo) {
      typeof cb == "function" && cb(that.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function(res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },

  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      self.globalData.userInfo = null;
      self.getUserInfo(function (userInfo){
        console.log(userInfo);

        wx.login({
          success(data) {
            wx.request({
              url: config.wxLoginUrl,
              data: {
                code: data.code
              },
              success(res) {
                console.log('拉取openid成功', res)
                self.globalData.openid = res.data.openid
                self.globalData.userInfo.userId = res.data.userId;
                self.globalData.userInfo.phone = res.data.phone;
                callback(null, self.globalData.openid)
              },
              fail(res) {
                console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                callback(res)
              }
            })
          },
          fail(err) {
            console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
            callback(err)
          }
        })

      });
      
    }
  },

  sendVerifyCode(phone, code, callback) {
    api.post(config.user.sendCodeUrl, {
      phone: phone,
      code: code,
    }).then(res => {
      var data = res.data;
      if (data.code != 200) {
        wx.showToast({
          title: '发送失败',
          icon: 'loading',
          duration: 2000
        })
        setTimeout(function() {
          wx.hideToast()
          typeof callback == "function" && callback(res)
        }, 1000)
      } else {
        wx.showToast({
          title: '发送成功',
          icon: 'loading',
          duration: 2000
        })
        setTimeout(function() {
          wx.hideToast();
          typeof callback == "function" && callback(res)
        }, 1000)
      }
    });
  },

  /* 绑定openid */
  wxLogin: function(userInfo, callback) {

    var self = this;

    this.getUserOpenId(function(failResult, openid) {

      api.post(config.user.wxLogin, {
        openId: openid,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        province: userInfo.province,
        city: userInfo.city
      }).then(res => {

        var data = res.data;

        if (data.code != 200) {
          wx.showToast({
            title: '授权登录失败',
            icon: 'loading',
            duration: 2000
          })
          setTimeout(function() {
            wx.hideToast();

            typeof callback == "function" && callback(self.globalData.userDetails);
          }, 2000)
        } else {

          wx.showToast({
            title: '授权登录成功',
            icon: 'loading',
            duration: 2000
          })
          setTimeout(function() {
            wx.hideToast();


            self.globalData.userInfo.userId = res.data.data.userId;
            self.globalData.userInfo.phone = res.data.data.phone;

            self.globalData.userDetails.userId = res.data.data.userId;
            self.globalData.userDetails.accessToken = res.data.data.accessToken;
            self.globalData.userDetails.phone = res.data.data.phone;

            typeof callback == "function" && callback(res);
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 1000)
        }
      });
    });
  },

  /* 返回 userDetails */
  /* 手机号登陆 */
  phoneLogin: function(phone, code, callback) {
    const self = this;

    const phoneNumber = phone;

    const openid = self.globalData.openid;
    const accessToken = self.globalData.userDetails.accessToken;

    /* 如果openid不为空 */
    if (openid) {

      /* 如果已经进行手机登陆，直接返回accessToken */
      if (accessToken != null && accessToken != "") {
        typeof callback == "function" && callback(self.globalData.userDetails);
      }
      // 若未进行手机登陆，发送手机登陆请求
      else {
        api.post(config.user.usePhoneLoginUrl, {
          phone: phone,
          code: code,
          openId: openid
        }).then(res => {
          if (res.data.code != 200) {
            wx.showToast({
              title: '手机登陆失败',
              icon: 'loading',
              duration: 2000
            })
            setTimeout(function() {
              wx.hideToast()

              typeof callback == "function" && callback(self.globalData.userDetails);
            }, 2000)
          }
          //手机登陆成功 
          else {
            wx.showToast({
              title: '发送成功',
              icon: 'loading',
              duration: 2000
            })
            setTimeout(function() {
              wx.hideToast()

              try {
                self.globalData.userDetails = {
                  phone: phoneNumber,
                  accessToken: res.data.data.accessToken,
                  userId: res.data.data.userId
                }
              } catch (error) {

              }

              typeof callback == "function" && callback(self.globalData.userDetails);
              wx.switchTab({
                url: '/pages/mine/mine',
              });

            }, 2000)
          }
        });
      }
    } else {
      //为空则需要重新微信授权登陆
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      });
    }
  },

  wxLogout: function(callback) {
    var self = this;

    self.globalData.userInfo = {};
    self.globalData.userDetails = {};
    self.globalData.openid = null;

    typeof callback == "function" && callback();
  },

  phoneLogout: function(accessToken, callback) {
    var self = this;

    api.postJson(config.user.logoutUrl, {}, {
      accessToken: accessToken
    }).then(res => {

      typeof callback == "function" && callback(res);
      if (res.data.code == 200) {
        self.globalData.userInfo = {};
        self.globalData.userDetails = {};
        self.globalData.openid = null;
      }
    });
  },


  globalData: {
    appId: 'wx78615aad1423ccf1',
    key: '2e89e83522c2dd868b67cbe3dcaf5f1f',   //AppSecret

    hasLogin: false,
    openid: null,

    currentAddress: "",

    userInfo: {},
    // userInfo: {
    //   phone: "",
    //   accessToken: "",
    //   userId: "",
    //   nickName: "",
    //   avatarUrl: "",
    //   province: "",
    //   area: "",
    //   city: ""
    // },


    userDetails: {},
    // userDetails: {
    //   phone: "",
    //   accessToken: "",
    //   userId: ""
    // },
    systemInfo: null,
    baseUrl: config.requestUrl,
  },


})