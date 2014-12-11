NewsReader.Collections.Feeds = Backbone.Collection.extend({
  url: "/api/feeds",
  model: NewsReader.Models.Feed,
  getOrFetch: function(id){
    var feed = this.get(id);
    if (!feed) {
      feed = new NewsReader.Models.Feed({id: id});
      var collection = this;
      feed.fetch({
        success: function(model){
          collection.add(model);
        }
      });
    }
    
    return feed;
  }
})