NewsReader.Views.FeedsIndex = Backbone.CompositeView.extend({
  initialize: function() {
    // this.collection.fetch();
    this.listenTo(this.collection, "add", this.addFeedView);
    this.listenTo(this.collection, "sync remove add", this.render);
    this.collection.each(function(feed){
      this.addFeedView(feed);
    }.bind(this));
  },
  
  addFeedView: function(feed) {
    var feedView = new NewsReader.Views.FeedListView({
      model: feed,
      collection: this.collection
    });
    this.addSubview(feedView);
  },
  
  template: JST["feeds/index"],
  
  render: function(){
    var content = this.template();
    this.$el.html(content);
    var $listEl = this.$('ul.feed-list');
    this.renderSubviews($listEl);
    return this;
  }
})

//http://news.yahoo.com/rss/