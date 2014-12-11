NewsReader.Views.FeedListView = Backbone.CompositeView.extend({
  tagName: "li",
  initialize: function(options) {
    this.model = options.model;
  },
  
  events: {
    "click button.delete-feed": "deleteFeed"
  },
  
  template: JST["feeds/feed_list"],
  
  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    
    return this;
  },

  deleteFeed: function() {
    this.model.destroy();
  }
})