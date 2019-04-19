// var bmap = require('../../libs/bmap/bmap-wx.min.js');

var api = require('../../../utils/promise.js');
var config = require('../../../config.js');
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    myinfo: {
      realName: "",
      gender: 1,
      idCard: "",
      phone: "",
    },

    boy: true,

    files: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      myinfo: app.globalData.userInfo,
    });

  },

  onShow: function() {
    // this.setData({
    //   'myinfo.userId': app.globalData.userInfo.userId,
    // });
  },

  //获取手机号
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },


  // 人脸拍摄 start ==============
  uploadPhoto(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log('本地图片的路径:', tempFilePaths)
        that.setData({
          files: [tempFilePaths]
        });
      }
    })
  },

  //输入框 start =============
  enterRealName: function(e) {
    this.setData({
      'myinfo.realName': e.detail.value
    });
  },
  enterIdCard: function(e) {
    this.setData({
      'myinfo.idCard': e.detail.value
    });
  },
  enterPhone: function(e) {
    this.setData({
      'myinfo.phone': e.detail.value
    });
  },
  //输入框 end =============

  //性别选择
  chooseGender: function(e) {
    console.log("chooseGender");
    var gender = !this.data.boy;
    this.setData({
      boy: gender
    });
  },

  /* 确认 */
  postConfirm: function(e) {
    console.log(this.data.files);
    console.log(this.data.boy);
    console.log(this.data.myinfo);
    // try {
    //   this.uploadImage();
    //   this.postInfo();
    // } catch (error) {
    //   console.log("确认失败");
    // }
  },


  uploadImage: function(tempFilePaths) {
    wx.showToast({
      icon: "loading",
      title: "正在上传",
      duration: 2000
    });
    wx.uploadFile({
      url: config.user.uploadImgUrl,
      filePath: tempFilePaths[0], //文件value
      name: 'file', //文件key
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        userId: app.gloablData.userInfo.userId
      },
      success: function(res) {         //上传成功返回数据
        console.log('上传成功返回的数据', JSON.parse(res.data).data);
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
      },
      fail: function(e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function() {
        wx.hideToast(); //隐藏Toast
      }
    });
  },
  // 人脸拍摄 end ==============

  postInfo: function() {
    var that = this;
    api.post(config.user.modifyUserInfoUrl, {
      realName: that.data.myinfo.realName,
      gender: that.data.myinfo.gender,
      idCard: that.data.myinfo.idCard,
      phone: that.data.myinfo.phone
    }).then(res => {

      console.log(res);

    })
  },



})