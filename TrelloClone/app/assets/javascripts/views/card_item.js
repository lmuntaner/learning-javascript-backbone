TrelloClone.Views.CardItem = Backbone.View.extend({
  template: JST["cards/item"],
  tagName: "li",
  className: "card-item",
  
  initialize: function(options) {
    this.$el.attr("data-card-id", this.model.id);
    this.$el.attr("data-list-id", this.model.get("list_id"));
  },
  
  render: function() {
    var content = this.template({
      card: this.model
    })
    this.$el.html(content);
    this.$('ul.cards').sortable({connectWith: "ul.cards"});
    return this;
  },
})