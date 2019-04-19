'use strict';
import Promise from './es6-promise.min'


module.exports = {

  get(url, header) {

    var headerParam = {
      "Content-Type": 'application/json',
      "platform": 1
    };

    if (header != null && header.accessToken != null) {
      headerParam.accessToken = header.accessToken
    }

    return new Promise((resolve, reject) => {
      console.log(url)

      wx.request({
        url: url,
        // headers: {
        //   'Content-Type': 'application/json'
        //   "platform": 1,
        // },
        header: headerParam,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  },

  post(url, data, header) {
    var headerParam = {
      "Content-Type": "application/x-www-form-urlencoded",
      "platform": 1,
    };

    if (header != null && header.accessToken != null) {
      headerParam.accessToken = header.accessToken
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: 'POST',
        // headers: {
        //   'Cache-Control': 'no-cache',
        //   'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
        // },
        header: headerParam,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  },

  postJson(url, data, header) {

    var headerParam = {
      "Content-Type": "application/json",
      "platform": 1,
    };

    if (header != null && header.accessToken != null) {
      headerParam.accessToken = header.accessToken
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: 'POST',
        header: headerParam,
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        }
      })
    })
  },

  json2Form(json) {
    var str = []
    for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
    }
    return str.join("&")
  }

};