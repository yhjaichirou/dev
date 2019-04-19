const config = require("../../../config.js");
const api = require("../../../utils/promise.js");
const dateutil = require("../../../utils/dateutil.js");
var app = getApp();

var scenicDetailData = require("../../../data/order/scenicDetail.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    companyId: "",

    tickets: [],

    tourDates: [],

    surplus: 0,


    in_name: "",
    in_phone: "",
    allprice: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options);

    this.setData({
      type: options.type,
      companyId: options.companyId,
      // surplus: options.surplus ? options.surplus : 0,
      surplus: parseInt(options.surplus),//限制
      name: options.name,

      tickets: [{
        name: '成人',
        price: 168,
        num: 0
      }, {
        name: '儿童',
        price: 38,
        num: 0
      }, {
        name: '学生',
        price: 78,
        num: 0
      }],
    });

    this.sumup();

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    this.setData({
      tourDates: scenicDetailData.scenicDetail
    });

    if (app.globalData.userInfo.nickName) {
      that.setData({
        in_name: app.globalData.userInfo.nickName
      });
    }
    if (app.globalData.userInfo.phone) {
      that.setData({
        in_phone: app.globalData.userInfo.phone
      });
    }
  },

  /* 选择游玩日期 */
  chooseDay: function(e) {
    var index = e.currentTarget.dataset.index;
    var checked = this.data.tourDates[index].checked;
    var tourDates = this.data.tourDates;
    tourDates[index].checked = !checked;
    this.setData({
      tourDates: tourDates
    });
  },

  getTotalTickets() {
    var tickets = this.data.tickets;
    var total = 0;
    for (var i in tickets) {
      var item = tickets[i];
      total += item.num;
    }
    return total;
  },

  /* 某票+1 */
  addTicket(e) {
    console.log("addTicket");
    console.log(this.data.tickets.length);
    console.log(this.data.surplus);
    if (this.getTotalTickets() >= this.data.surplus) {
      return;
    }
    var name = e.currentTarget.dataset.name;
    var that = this;
    var tickets = that.data.tickets;
    for (var i = 0; i < tickets.length; i++) {
      var ticket = tickets[i];
      if (tickets[i].name === name) {
        ticket.num++;
        tickets[i] = ticket;
        that.setData({
          allprice: (that.data.allprice + ticket.price),
          tickets: tickets
        });
        break;
      }
    }
  },
  /* 某票-1 */
  subTicket(e) {
    console.log("subTicket");
    var name = e.currentTarget.dataset.name;
    var that = this;
    var tickets = that.data.tickets;
    for (var i = 0; i < tickets.length; i++) {
      var ticket = tickets[i];
      if (tickets[i].name === name) {
        if (ticket.num <= 0) {
          break;
        }
        ticket.num--;
        tickets[i] = ticket;
        that.setData({
          allprice: (that.data.allprice - ticket.price),
          tickets: tickets
        });
        break;
      }
    }
  },

  sumup() {
    var tickets = this.data.tickets;
    var allprice = 0;
    for (var i = 0; i < tickets.length; i++) {
      var ticket = tickets[i];
      allprice += (ticket.price * ticket.num);
    }
    this.setData({
      allprice: allprice
    });
  },

  //付款
  fu: function(e) {
    var that = this;

    console.log(this.data.tourDates);

    var phone = that.data.in_phone;

    if (phone == "" || phone == null) {
      phone = 0;
    }


    console.log({
      userId: app.globalData.userInfo.userId,
      nickName: that.data.in_name,
      companyId: parseInt(that.data.companyId),
      phone: phone,

      type: parseInt(that.data.type), //个人、旅社、团体
      childNum: that.data.tickets[0].num,
      adultNum: that.data.tickets[1].num,
      oldNum: that.data.tickets[2].num,
      useTime: dateutil.dateFormat(new Date()),
    });

    //发起支付
    // wx.navigateTo({
    //   // url: '/pages/request-payment/request-payment',
    //   url: '/pages/pay/pay',
    // });
    // return;

    if (app.globalData.userInfo.userId == null) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      });
      return;
    }

    api.post(config.order.orderUrl, {
      userId: app.globalData.userInfo.userId,
      nickName: that.data.in_name,
      companyId: parseInt(that.data.companyId),
      phone: phone,

      type: parseInt(that.data.type), //个人、旅社、团体
      childNum: that.data.tickets[0].num,
      adultNum: that.data.tickets[1].num,
      oldNum: that.data.tickets[2].num,
      useTime: dateutil.dateFormat(new Date()),
    }).then(res => {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'loading',
          duration: 2000
        })
        setTimeout(function() {
          wx.hideToast();
        }, 1000)

      } else {

        var orderId = res.data.data;
        console.log(res.data);
        console.log("res.data");

        wx.showToast({
          title: '付款成功',
          icon: 'loading',
          duration: 2000
        })
        setTimeout(function() {
          wx.hideToast();
          wx.redirectTo({
            url: '/pages/order/scenic/index?orderId=' + orderId,
          });
        }, 1000);

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  nameInput: function(e) {
    this.setData({
      in_name: e.detail.value
    });
  },
  phoneInput: function(e) {
    this.setData({
      in_phone: e.detail.value
    });
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})