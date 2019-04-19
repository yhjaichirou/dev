/**
 * 小程序配置文件
 */


const schema = 'https'


// const host = 'localhost:9020/tour'
// const host = 'tourtest.d-chip.com:9020/tour'
const host = 'tourtest.d-chip.com/tour'

const appid = 'wx78615aad1423ccf1'

const mchId = 'c802465b90d86e1c1e6379207a5ac48f'


const config = {

  appid: appid,
  mchId: mchId,

  // 下面的地址配合云端 Server 工作
  host: host,

  // 请求地址
  requestUrl: `${schema}://${host}`,
  faceDetectUrl: `${schema}://${host}/faceDetect`,
  getArticlesUrl: `${schema}://${host}/index/getArticles`,

  wxLoginUrl: `${schema}://${host}/wx/user/${appid}/login`,
  wxInfoUrl: `${schema}://${host}/wx/user/${appid}/info`,
  wxPhoneUrl: `${schema}://${host}/wx/user/${appid}/phone`,

  mediaUploadUrl: `${schema}://${host}/wx/media/${appid}/upload`,
  mediaDownloadUrl: `${schema}://${host}/wx/media/${appid}/download`, //{mediaId}

  // 生成支付订单的接口
  createOrderUrl: `${schema}://${host}/pay/createOrder`,

  // 统一生成支付订单的接口
  unifiedOrderUrl: `${schema}://${host}/pay/unifiedOrder`,

  rechargeUrl: `${schema}://${host}/payment/recharge`,

  websocketUrl: `wss://${host}/websocket/`,


  // scenicListUrl: `${schema}://${host}/index/getScenicList`,
  scenicListUrl: `${schema}://${host}/company/getCityList`,

  // scenicInfoUrl: `${schema}://${host}/index/getScenicInfo`,
  scenicInfoUrl: `${schema}://${host}/company/findById`,

  scenicTicketListUrl: `${schema}://${host}/scenicTicket/list`,


  scenicCommentListUrl: `${schema}://${host}/comment/list`,

  /**
   * 首页顶部banner
   */
  bannerListUrl: `${schema}://${host}/index/getBannerList`,
  /**
   * 首页底部列表
   */
  // functionListUrl: `${schema}://${host}/index/getFunctionList`,
  functionListUrl: `${schema}://${host}/company/getAllHotCompany`,


  hotelBannerUrl: `${schema}://${host}/index/getHotelBanner`,
  /* 单个酒店信息 */
  hotelInfoUrl: `${schema}://${host}/index/getHotelInfo`,

  goodsUrl: `${schema}://${host}/index/getGoods`,
  goodsListUrl: `${schema}://${host}/index/getGoodsList`,

  user: {
    baseUrl: `${schema}://${host}/user/`,
    sendCodeUrl: `${schema}://${host}/user/sendVerificationCode`,
    regitserUrl: `${schema}://${host}/user/usePhoneRegister`,
    usePhoneLoginUrl: `${schema}://${host}/user/usePhoneLogin`,
    wxLogin: `${schema}://${host}/user/wxLogin`,
    getUserDetailsUrl: `${schema}://${host}/user/getUserDetails`,
    logoutUrl: `${schema}://${host}/user/loginOut`,

    modifyUserInfoUrl: `${schema}://${host}/user/modifyUserInfo`,
    uploadImgUrl: `${schema}://${host}/user/uploadNickImg`,
  },

  //景区门票订单
  order: {
    orderUrl: `${schema}://${host}/order`,
    orderListUrl: `${schema}://${host}/order/list`,
  },


  collectionUrl: `${schema}://${host}/index/getGoodsList`,


  //支付
  requestPaymentUrl: `${schema}://${host}/wxpay/prepay`,


  restaurant: {
    //查询所有餐厅
    getAllRestaurantUrl: `${schema}://${host}/restaurant/getAllRestaurant`,
    //美食餐厅详情
    detailUrl: `${schema}://${host}/restaurant/detailed`,
    //餐厅下的所有美食
    commentUrl: `${schema}://${host}/restaurantComment/commentAllUrl`,
  },

  restaurantFood:{
    //餐厅下的所有美食
    getAllFoodUrl: `${schema}://${host}/food/all`,
    //热销菜品
    getHotFoodUrl: `${schema}://${host}/food/hot`,
    //折扣菜品
    getDiscountFoodUrl: `${schema}://${host}/food/discount`,
    //菜品类型
    getFoodTypeUrl: `${schema}://${host}/food/foodType`,
  },

  hotel: {
    /**
     * 酒店搜索列表
     */
    hotelListUrl: `${schema}://${host}/hotel/getAllHotel`,
    hotelRoomAllUrl: `${schema}://${host}/room/all`,
    hotelRoomPriceUrl: `${schema}://${host}/room/price`,
    hotelRoomTypeNumUrl: `${schema}://${host}/room/roomTypeNum`,
    hotelRemarkListUrl: `${schema}://${host}/remark/remarkList`,
    hotelAddRemarkUrl: `${schema}://${host}/remark/addRemark`,
    hotelCreateOrderUrl: `${schema}://${host}/remark/hotelOrder`,
    hotelOrderUpdateUrl: `${schema}://${host}/hotelOrder/update`,    
  },
  food: {
    getHotUrl: `${schema}://${host}/food/hot`,
    getDisUrl: `${schema}://${host}/food/discount`,
    getAllUrl: `${schema}://${host}/food/all`,
  },


}

module.exports = config