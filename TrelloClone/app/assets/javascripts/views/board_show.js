TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
    this.addListIndex();
  },
  
  addListIndex: function() {
    this.listIndex = new TrelloClone.Views.ListIndex({
      collection: this.model.lists()
    });

    this.addSubview("div.list-index", this.listIndex);
  },
  
  render: function() {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
})