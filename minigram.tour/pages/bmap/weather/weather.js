var bmap = require('../../../libs/bmap/bmap-wx.min.js');
Page({
    data: {
        weatherData: ''
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
          ak: '826e806b86676d155282de3d37188137'
        });
        var fail = function(data) {
            console.log('fail!!!!')
        };
        var success = function(data) {
            console.log('success!!!');
            var weatherData = data.currentWeather[0];
            weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n';
            that.setData({
                weatherData: weatherData
            });
        }
        BMap.weather({
            fail: fail,
            success: success
        });
    }
})