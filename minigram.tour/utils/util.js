function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function toThousands(num) {
  return (num || "").replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}


function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = day * 365;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    //非法操作
    return '数据出错';
  }
  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (yearC >= 1) {
    result = parseInt(yearC) + '年以前';
  } else if (monthC >= 1) {
    result = parseInt(monthC) + '个月前';
  } else if (weekC >= 1) {
    result = parseInt(weekC) + '星期前';
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前';
  } else if (minC >= 5) {
    result = parseInt(minC) + '分钟前';
  } else {
    result = '刚刚发表';
  }
  return result;
}

/* json转表单地址参数 */
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}


/*'yyyy-MM-dd HH:mm:ss'格式的字符串转日期*/
function stringToDate(str){
    var tempStrs = str.split(" ");
    var dateStrs = tempStrs[0].split("-");
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    var timeStrs = tempStrs[1].split(":");
    var hour = parseInt(timeStrs [0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
}

//计算小时数后剩余的毫秒数
function TimeDiff(date1, date2) {
    var date3 = date2.getTime()-date1.getTime()  //时间差的毫秒数
    //计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))
    //计算出小时数
    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))
    //计算相差秒数
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000)
    var time = {
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    }
    return time
}

/*
 * 日期格式化
 * 使用:
 * dateFormat(date, 'yyyy-MM-dd HH:mm')    //2015-10-21 16:38
 * dateFormat(date, 'MM-dd')   			 //10-21
 * dateFormat(date, 'w')   				 //三    //星期三
 * dateFormat(date, 'eM d,yyyy')   		 //Oct 10,2015
*/
var _$encode = function (_map, _content) {
  _content = '' + _content;
  if (!_map || !_content) {
    return _content || '';
  }
  return _content.replace(_map.r, function ($1) {
    var _result = _map[!_map.i ? $1.toLowerCase() : $1];
    return _result != null ? _result : $1;
  });
};
var dateFormat = (function () {
  var _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g },
    _12cc = ['上午', '下午'],
    _12ec = ['AM', 'PM'],
    _week = ['日', '一', '二', '三', '四', '五', '六'],
    _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  var _fmtnmb = function (_number) {
    _number = parseInt(_number) || 0;
    return (_number < 10 ? '0' : '') + _number;
  };
  var _fmtclc = function (_hour) {
    return _hour < 12 ? 0 : 1;
  };
  return function (_time, _format, _12time) {
    if (!_time || !_format)
      return '';
    _time = new Date(_time);
    _map.yyyy = _time.getFullYear();
    _map.yy = ('' + _map.yyyy).substr(2);
    _map.M = _time.getMonth() + 1;
    _map.MM = _fmtnmb(_map.M);
    _map.eM = _emon[_map.M - 1];
    _map.cM = _cmon[_map.M - 1];
    _map.d = _time.getDate();
    _map.dd = _fmtnmb(_map.d);
    _map.H = _time.getHours();
    _map.HH = _fmtnmb(_map.H);
    _map.m = _time.getMinutes();
    _map.mm = _fmtnmb(_map.m);
    _map.s = _time.getSeconds();
    _map.ss = _fmtnmb(_map.s);
    _map.ms = _time.getMilliseconds();
    _map.w = _week[_time.getDay()];
    var _cc = _fmtclc(_map.H);
    _map.ct = _12cc[_cc];
    _map.et = _12ec[_cc];
    if (!!_12time) {
      _map.H = _map.H % 12;
    }
    return _$encode(_map, _format);
  };
})();


function GetURL(message){
   var reg =  /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
   var done_message = message.match(reg);
   return done_message[0]
}

function Upload(path, file, data, cb) {
  wx.uploadFile({
    url: getApp().data.baseUrl + path,
    filePath: file,
    name: "file",
    formData: data,
    success: (res) => {
      if (typeof (res.data) == "string") {
        typeof cb == "function" && cb(JSON.parse(res.data), "");
      } else {
        typeof cb == "function" && cb(res.data, "");
      }
    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
    }
  });
};

//【判断是否是中文】
function isChina(str) {
  var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
  if (reg.test(str)) {
    return false;
  }
  return true;
}

module.exports.formatTime = formatTime;
module.exports.toThousands = toThousands;
module.exports.getDateDiff = getDateDiff;
module.exports.TimeDiff = TimeDiff;
module.exports.dateFormat = dateFormat;
module.exports.isChina = isChina;

module.exports.json2Form = json2Form;
module.exports.stringToDate = stringToDate;
module.exports.GetURL = GetURL;
module.exports.Upload = Upload;
