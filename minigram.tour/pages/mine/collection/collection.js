const config = require("../../../config.js");
const api = require("../../../utils/promise.js");
var app = getApp();

Page({
  data: {
    activeIndex: 0,
    content: '菜單一',
    tabs: [
      {
        id: 1,
        tabName: '全部'
      }, {
        id: 2,
        tabName: '景区'
      },
      {
        id: 3,
        tabName: '酒店'
      }, {
        id: 4,
        tabName: '停车'
      },
    ],
    contentList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var vm = this;
    wx.getSystemInfo({
      success: (res) => {
        vm.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  changeTab: function (e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      content: e.currentTarget.dataset.name
    })
  },
  getMore: function () {
    // this.setData({
    //   contentList: this.data.contentList.concat([
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' }
    //   ])
    // });
    // const config = require("../../../config.js");
    // const api = require("../../../utils/promise.js");
    // var app = getApp();

    api.post(config.collectionUrl,{}).then(res=> {
      console.log(res);
    });

  }
})