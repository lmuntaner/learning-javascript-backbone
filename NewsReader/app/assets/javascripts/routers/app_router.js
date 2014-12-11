NewsReader.Routers.AppRouter = Backbone.Router.extend({
  initialize: function($contentEl, feeds) {
    this.$contentEl = $contentEl;
    this.collection = feeds;
  },
  
  routes: {
    "": "feedsIndex",
    "feeds/new": "newFeed",
    "feeds/:id": "feedShow"
  },
  
  feedsIndex: function(){
    var feedsView = new NewsReader.Views.FeedsIndex({
      collection: this.collection
    });
    this._swapView(feedsView);
  },
  
  feedShow: function(id) {
    var feed = this.collection.getOrFetch(id);
    
    var feedShow = new NewsReader.Views.FeedShow({ model: feed });
    
    this._swapView(feedShow);
  },
  
  newFeed: function() {
    var newView = new NewsReader.Views.NewFeed({collection: this.collection});
    $("a.create-feed").remove();
    this.$contentEl.prepend(newView.render().$el);
  },
  
  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$contentEl.html(this.currentView.render().$el);
  }
})