
function request(option, cb) {

  wx.request({
    url: option.url,
    data: option.data ? option.data : {},
    method: option.method ? option.method : 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: option.header ? option.header : { 'content-type': 'application/json' }, // 设置请求的 header
    success: function (res) {
      cb(res);
    },
    fail: function (err) {
      cb(err);
    }
  });

}

function showLoading() {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  });
}

function hideLoading() {
  wx.hideToast();
}

function showSuccess(msg, time, cb) {

  wx.showToast({
    title: msg,
    icon: 'success',
    duration: time
  });

  setTimeout(function () {
    cb();
  }, time);

}


module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  showSuccess: showSuccess
}
