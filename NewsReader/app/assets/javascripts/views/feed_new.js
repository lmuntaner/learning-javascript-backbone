NewsReader.Views.NewFeed = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.collection = options.collection;
  },
  events: {
    "submit form": "createFeed"
  },
  
  template: JST["feeds/new"],
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  
  createFeed: function(event) {
    event.preventDefault();
    
    var $target = $(event.currentTarget);
    var params = $target.serializeJSON()["feed"];
    
    var newFeed = new NewsReader.Models.Feed(params);
    var collection = this.collection;
    var view = this;
    newFeed.save({}, {
      success: function (model) {
        collection.add(model);
        view.remove();
        Backbone.history.navigate("#", {trigger: true})
      },
      error: function(model, response) {
        debugger
      }
    });
  }
  
})