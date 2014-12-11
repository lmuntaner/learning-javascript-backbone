NewsReader.Collections.Entries = Backbone.Collection.extend({
  initialize: function(feed) {
    this.feed = feed;
  },
  model: NewsReader.Models.Entry,
  url: function() {
    return this.feed.url() + '/entries';
  }
})