NewsReader.Views.EntryShow = Backbone.CompositeView.extend({
  tagName: "li",
  
  initialize: function(options) {
    this.model = options.model;
  },
  
  template: JST["feeds/entry"],
  
  render: function() {
    var content = this.template({ entry: this.model });
    this.$el.html(content);
    return this;
  }
})