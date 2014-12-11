window.NewsReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $contentEl = $('#content');
    var feeds = new NewsReader.Collections.Feeds(JSON.parse(_feedsJSON));
    new NewsReader.Routers.AppRouter($contentEl, feeds);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  NewsReader.initialize();

});

Backbone.CompositeView = Backbone.View.extend({
  subViews: [],
  
  addSubview: function(view) {
    this.subViews.push(view);
  },
  
  renderSubviews: function ($parentEl) {
    this.subViews.forEach(function(subView) {
      $parentEl.append(subView.render().$el);
    });
  },
  
  removeSubview: function (subview) {
    var subviewIndex = this.subViews.indexOf(subview);
    this.subViews.splice(subviewIndex, 1);
    subview.remove();
  },
  
  remove: function() {
    Backbone.View.prototype.remove.call(this);
    var compositeView = this;
    _(this.subViews).each(function(subview) {
      compositeView.removeSubview(subview);
    });
  }
})