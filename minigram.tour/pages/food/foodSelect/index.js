// pages/food/foodSelect/index.js
const api = require("../../../utils/promise.js")
const config = require("../../../config.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelType:'hot',
    isScroll:null,
    labelTypes:{
      0:'hot',
      1:'discount',
      2:"type1",
      3: "type2",
      4:"type3",
      5:"type4",
    },
    hotH:0,
    disH:0,
    type1H:0,
    type2H:0,
    type3H:0,
    type4H:0,
    hotList:[],
    disList:[],
    speList:[],
    stapList:[],
    drinkList:[],
    otherList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    // 热销
    api.post(config.food.getHotUrl,{
      restaurantId:1,
      pageNum:1,
      pageSize:100
    }).then(res=>{
      if(res.data.code == 200){
        this.setData({ hotList: res.data.data.content})
      }
    })
    // 折扣
    api.post(config.food.getDisUrl,{
      restaurantId: 1,
      pageNum: 1,
      pageSize: 100
    }).then(res=>{
      if (res.data.code == 200) {
        this.setData({ disList: res.data.data.content })
      }
    })
    //所有
    api.post(config.food.getAllUrl,{
      restaurantId: 1,
      pageNum: 1,
      pageSize: 100
    }).then(res=>{
      if (res.data.code == 200) {
        // foodType = 1 特色菜品
        // 2养生主食
        // 3酒水
        // 4其它
        let footList = res.data.data.content;
        let othList = [], speList = [],stapList=[],drinkList=[];
        for(let i=0,len = footList.length;i<len ; i++){
          if (footList[i].foodType == 4){
            othList.push(footList[i])
          }
          if(footList[i].foodType == 3){
            drinkList.push(footList[i])
          }
          if(footList[i].foodType == 2){
            stapList.push(footList[i])
          }
          if(footList[i].foodType ==1){
            speList.push(footList[i])
          }
        }

        this.setData({
          otherList:othList,
          speList:speList,
          stapList:stapList,
          drinkList:drinkList
        })
        this.operH();
      }
    })
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

  },
  selectType:function(e){
    this.setData({ isScroll: false });
    this.setData({
      labelType: this.data.labelTypes[String(e.currentTarget.dataset['type'])]
    })
  },
  operH:function(){
    let that = this;
    var query = wx.createSelectorQuery();
    query.selectAll('.scroller').boundingClientRect((rect)=>{
      let sHotH = 0,sDisH = 0,sT1H = 0,sT2H = 0,sT3H = 0,sT4H = 0;
      for(let i =0;i<rect.length;i++){
        if (rect[i].id == 'hot') {
          sHotH = rect[i].height
        }
        if (rect[i].id == 'discount') {
          sDisH = rect[i].height;
        }
        if (rect[i].id == 'type1') {
          sT1H = rect[i].height;
        }
        if (rect[i].id == 'type2') {
          sT2H = rect[i].height;
        }
        if (rect[i].id == 'type3') {
          sT3H = rect[i].height;
        }
        if (rect[i].id == 'type4') {
          sT4H = rect[i].height;
        }
      }
      sDisH = sHotH + sDisH;
      sT1H = sDisH + sT1H;
      sT2H = sT1H + sT2H;
      sT3H = sT2H + sT3H;
      sT4H = sT3H + sT4H;
      this.setData({
        hotH : sHotH,
        disH: sDisH,
        type1H: sT1H,
        type2H: sT2H,
        type3H: sT3H,
        type4H: sT4H
      });
    }).exec();

  },
  scrollfun:function(e){
    this.setData({ isScroll:true})
    let scrollT = e.detail.scrollTop;
    if (scrollT <= this.data.hotH){
      console.log("dayu 热销")
      this.setData({labelType:this.data.labelTypes['0']})
    }
    if (this.data.disH >= scrollT && scrollT > this.data.hotH) {
      this.setData({ labelType: this.data.labelTypes['1'] })
      console.log("dayu 折扣")
    }
    if (this.data.type1H >= scrollT && scrollT> this.data.disH ) {
      this.setData({ labelType: this.data.labelTypes['2'] })
      console.log("dayu  特色")
    }
    if (this.data.type2H >= scrollT && scrollT > this.data.type1H) {
      this.setData({ labelType: this.data.labelTypes['3'] })
      console.log("大于 注释")
    }
    if (this.data.type3H >= scrollT && scrollT > this.data.type2H) {
      console.log("dayu  就是")
      this.setData({ labelType: this.data.labelTypes['4'] })
    }
    if (scrollT > this.data.type3H ) {
      console.log("dayu  其他")
      this.setData({ labelType: this.data.labelTypes['5'] })
    }
  },
  selectDood:function(e){
    console.log(e)
  }
})