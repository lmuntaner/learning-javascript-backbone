TrelloClone.Views.BoardIndexItem = Backbone.View.extend({
  template: JST["boards/index_item"],
  tagName: "li",
  className: "board-index-item",
  
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  onRender: function () {
    $('[data-toggle="tooltip"]').tooltip();
  },
  
  render: function () {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.onRender();
    
    return this;
  },
})