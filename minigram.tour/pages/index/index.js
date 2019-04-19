var bmap = require('../../libs/bmap/bmap-wx.min.js');

var api = require('../../utils/promise.js');
// var PageUtil = require('../../utils/PageUtil.js');
var config = require('../../config.js');
var app = getApp();

Page({
  data: {

    //分页参数 start ================
    address: '定位中…',
    limit: 10,
    currentPage: 0,

    pageUtil: null,
    //分页参数 end ================

    banners: [],
    searchInputValue: "",

    icons: [
      [{
          id: 1,
          img: '/images/index/icon_scene.png',
          name: '景区',
          url: '../scenicSpot/index',
        },
        {
          id: 2,
          img: '/images/index/icon_hotel.png',
          name: '酒店',
          url: '../hotel/choose',
        },
        {
          id: 5,
          img: '/images/index/icon_food.png',
          name: '美食',
          url: '../restaurant/search/search',
          // url: '../food/index/index',
          // url: '../food/food/food',
          // url: '../food/food2/food2',
          // url: '../food/foodcomment/foodcomment',
        },
        {
          id: 8,
          img: '/images/index/icon_parking.png',
          name: '停车',
          url: '../parking/parking'
        }
      ],
    ],

    functionList: [{
      title: '热门景区',
      tabType: 1,
      list: [],
    }],

    // functionList: [{
    //   title: '热门景区',
    //   tabType: 1,
    //   list: [{
    //     address: "唐家湾",
    //     area: "香洲区",
    //     city: "珠海",
    //     companyId: 2,
    //     content: "世界第一园",
    //     name: "圆明新园",
    //     photo: null,
    //     province: "珠海市",
    //     remark: "真好玩啊",
    //     score: 7.7,
    //     status: 1,
    //     tel: "123",
    //   }],
    // }],

  },

  onLoad: function(options) {
    var that = this;

    // this.data.pageUtil = new PageUtil(that, "functionList[0].list", config.functionListUrl, 10);

    // this.data.pageUtil.fetchMore(that.data.functionList[0].list, function (res) {
    //   console.log(res);
    // });
    //获取顶部banner
    api.post(config.bannerListUrl, {}).then(res => {
      // that.setData({
      //   banners: res.data
      // });
      that.setData({
        banners: [{
          img: "https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=34071cdb08087bf469e15fbb93ba3c49/6a63f6246b600c33aed6fd58104c510fd8f9a1f6.jpg"
        }]
      });
    });


    this.setAddress(function(address) {
      that.fetchMore();
    });
  },

  onShow: function() {
    var that = this;

    // 检查登陆状态
    // console.log(app.globalData.userInfo);
    // if (app.globalData.userInfo == null || app.globalData.userInfo.nickName == null || app.globalData.userInfo.nickName == "") {
    //   wx.navigateTo({
    //     url: '/pages/authorize/authorize',
    //   });
    // };

    that.fetchMore();
  },
  onReachBottom() {
    console.log("onReachBottom");
    this.fetchMore();
  },

  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    } else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: 'DX智慧旅游首页',
      path: '/pages/index/index',
      imageUrl: "/images/authorize/logo.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  //绑定输入值
  searchInput: function(e) {
    this.setData({
      searchInputValue: e.detail.value
    });
  },
  //清除输入
  searchClear: function(e) {
    this.setData({
      searchInputValue: ""
    });
  },

  setAddress(callback) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '826e806b86676d155282de3d37188137'
    });
    var fail = function(data) {
      console.log('获取位置失败!')
    };
    var success = function(data) {
      console.log('获取位置成功!')
      var weatherData = data.currentWeather[0];
      that.setData({
        address: weatherData.currentCity
      });
      app.globalData.currentAddress = weatherData.currentCity;
      typeof callback == 'function' && callback(weatherData.currentCity);
    }
    BMap.weather({
      fail: fail,
      success: success
    });
  },

  /* 滑动时顶部搜索栏的动画 */
  onScroll: function(e) {
    if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
  },

  /**
   * 顶部搜索
   */
  tapSearch: function() {

    var that = this;

    console.log("搜索关键字");
    console.log(that.data.searchInputValue);

    this.fetchMore(function(res) {
      console.log(res.data);
    });
  },

  //点击某个banner
  tapBanner: function(e) {
    var name = this.data.banners[e.target.dataset.id].name;
  },


  /* 点击 景区/酒店/美食/停车 进入详细*/
  toNearby: function(e) {
    var self = this;

    var url = e.currentTarget.dataset.url;
    if (self.data.address) {
      url += "?address=" + self.data.address;
      // url += "?address=北京";
    } else {
      url += "?address=北京";
    }

    wx.navigateTo({
      url: url
    });
  },

  /* 点击 热门景区某项 进入详情 */
  lookdetail(e) {
    console.log(e.currentTarget.dataset.tabtype);
    var type = e.currentTarget.dataset.tabtype;
    var companyid = e.currentTarget.dataset.companyid;

    switch (type) {
      case 1:
        wx.navigateTo({
          url: '/pages/scenicSpot/detail/detail?companyId=' + companyid,
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/restaurant/search/search?companyId=' + companyid,
        });
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/hotel/hotel?companyId=' + companyid,
        });
        break;
      case 4:
        wx.navigateTo({
          url: '/pages/parking/parking?companyId=' + companyid,
        });
        break;
      default:
        break;
    }
  },


  //加载更多
  fetchMore(callback) {
    var that = this;
    var limit = that.data.limit;
    var page = that.data.currentPage + 1;
    var city = that.data.address;
    var search = that.data.searchInputValue;

    if (city.indexOf("市") == -1){
      city+="市";
    }

    console.log("limit: " + limit);
    console.log("page: " + page);
    console.log("搜索城市");
    console.log(city);
    console.log("搜索关键词");
    console.log(search);

    api.post(config.functionListUrl, {
      limit: limit,
      page: page,
      city: city
    }).then(res => {
      typeof callback == 'function' && callback(res);

      if (res.data.length == 0) {
        return;
      }
      that.setData({
        currentPage: page
      });
      var list = that.data.functionList[0].list;
      that.setData({
        functionList: [{
          title: '热门景区',
          tabType: 1,
          list: list.concat(res.data),
        }]
      });
    });
  },


});