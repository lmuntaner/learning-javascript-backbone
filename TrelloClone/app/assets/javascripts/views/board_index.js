TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function(options) {
    this.listenTo(this.collection, "add", this.addBoardItem);
    this.listenTo(this.collection, "sync add", this.render);
    var view = this;
    this.collection.each(function (board) {
      view.addBoardItem(board);
    });
  },
  
  onRender: function () {
    this.$('[data-toggle="tooltip"]').tooltip();
    Backbone.CompositeView.prototype.onRender.call(this);
  },
  
  addBoardItem: function (board) {
    var boardItemView = new TrelloClone.Views.BoardIndexItem({
      model: board,
      collection: this.collection
    });
    this.addSubview("ul.boards", boardItemView);
  },
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    
    return this;
  },
})