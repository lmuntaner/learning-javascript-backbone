NewsReader.Views.FeedShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.model.fetch();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.entries(), 'add', this.addEntryView);
    this.model.entries().each(function(entry) {
      this.addEntryView(entry);
    }.bind(this));
  },
  
  addEntryView: function(entry){
    var entryView = new NewsReader.Views.EntryShow({model: entry});
    this.addSubview(entryView);
  },
  
  events: {
    'click button.refresh': "refreshFeed"
  },
  
  template: JST["feeds/show"],
  
  render: function() {
    var content = this.template({feed: this.model});
    this.$el.html(content);
    var $parentEl = this.$('ul.entries');
    
    this.renderSubviews($parentEl);
    
    return this;
  },
  
  refreshFeed: function() {
    this.model.fetch();
  }
})