

module.exports = {

  json2Form(json) {
    var str = []
    for (var key in json) {
      str.push(key + "=" + json[key])
    }
    return str.join("&")
  }

};