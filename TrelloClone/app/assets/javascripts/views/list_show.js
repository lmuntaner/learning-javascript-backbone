TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  tagName: "li",
  className: "list-item",
  
  initialize: function(options) {
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.$el.attr("data-list-id", this.model.id);
    this.lists = options.lists;
    var view = this;
    this.model.cards().each(function (card) {
      view.addCard(card);
    });
  },
  
  addCard: function (card) {
    var cardItem = new TrelloClone.Views.CardItem({
      model: card
    });
    
    this.addSubview("ul.cards", cardItem);
  },
  
  // events: {
  //   "sortupdate ul.cards": "test"
  // },
  
  onRender: function () {
    var view = this;
    this.$('ul.cards').sortable({
      connectWith: "ul.cards",
      update: view.updateCard.bind(view)
    });
  },
  
  render: function() {
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    
    return this;
  },
  
  updateCard: function (event, ui) {
    var $item = $(ui.item);
    var newOrd = $item.index();
    var oldListId = $item.data("list-id");
    var oldList = this.lists.get(oldListId);
    var newListId = $item.parent().data("list-id");
    var card = oldList.cards().get($item.data("card-id"));
    var urlUpdate = "/api/cards/";
    urlUpdate += card.id + "/update_ord";
    card.set('old_ord', card.get("ord"));
    card.set("ord", newOrd);
    card.set("old_list_id", card.get("list_id"));
    card.set("list_id", newListId);
    var jsonData = {"card": card.attributes};
    $.ajax({
      url: urlUpdate,
      type: "POST",
      data: jsonData,
      success: function() {
        console.log("success");
      }
    })
  }
})