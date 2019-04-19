var api = require('./promise');

class PageUtil {

  constructor(context ,listName, url, limit) {
    this.context = context;
    this.url = url;
    this.listName = listName;
    this.limit = limit;
    this.currentPage = 0;
  };

  fetchMore(currentList,callback) {
    var self = this;
    var limit = this.limit;
    var page = this.currentPage + 1;
    var city = this.context.data.address;

    api.post(self.url, {
      limit: limit,
      page: page,
      city: city,
    }).then(res => {

      typeof callback == 'function' && callback(res);

      var pageList = res.data;
      if (pageList == null || pageList.length == 0) {
        return;
      }
      self.currentPage = page;
      self.context.setData({
        [self.listName]: currentList.concat(pageList)
      });
    })
  };
}

export default PageUtil;