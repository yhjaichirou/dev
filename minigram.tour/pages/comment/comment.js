const config = require("../../config.js");
const api = require("../../utils/promise.js");
var app = getApp();

Page({
  data: {
    files: [],


    stars: 4,
    inter: 2000,

    texts: "至少需要15个字",
    min: 15, //最少字数
    max: 500, //最多字数 (根据自己需求改变) 
    currentWordNumber: 0
  },

  //选择星号
  chooseStar(e) {
    var stars = e.currentTarget.dataset.index + 1;
    this.setData({
      stars: stars
    })
  },

  //字数限制  
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    console.log(len)
    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "至少还需要",
        textss: "字",
        num: this.data.min - len
      })
    else if (len > this.data.min)
      this.setData({
        texts: " ",
        textss: " ",
        num: ''
      })

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    // console.log(this.data)
  },

  chooseImage: function(e) {
    var that = this;
    if (that.data.files.length >= 3) {
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },


  /* 提交反馈 */
  postFeedBack: function(e) {
    var that = this;
    console.log(that.data.files);
    console.log(that.data.items);
  },


});