const config = require("../../config.js");

const api = require("../../utils/promise.js");


var app = getApp();
Page({
  data: {
    goods: {},
    goodsList: [],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    showCartDetail: false
  },
  onLoad: function(options) {
    var shopId = options.id;

    var that = this;


    api.post(config.goodsUrl, {}).then(res => {
      that.setData({
        goods: res.data
      });

    });

    api.post(config.goodsListUrl, {}).then(res => {
      that.setData({
        goodsList: res.data
      });

      that.setData({
        classifySeleted: that.data.goodsList[0].id
      });
    });

    // for (var i = 0; i < app.globalData.shops.length; ++i) {
    //   if (app.globalData.shops[i].id == shopId) {
    //     this.setData({
    //       shop: app.globalData.shops[i]
    //     });
    //     break;
    //   }
    // }
  },


  tapAddCart: function(e) {
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function(e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function(id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },
  reduceCart: function(id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function() {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },
  follow: function() {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function(e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function(classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function(e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function() {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function() {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function() {
    this.setData({
      showCartDetail: false
    });
  },

  /* 去结算 */
  submit: function(e) {

    var formId = e.detail.formId;

    console.log(formId);

    api.post(config.goodsListUrl, {}).then(res => {
      wx.showModal({
        showCancel: false,
        title: '恭喜',
        content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
        success: function(res) {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      })
    });
  }


});