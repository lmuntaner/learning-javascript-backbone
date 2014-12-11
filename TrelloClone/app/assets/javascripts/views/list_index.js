TrelloClone.Views.ListIndex = Backbone.CompositeView.extend({
  className: "lists-display",
  template: JST["lists/index"],
  
  initialize: function (options) {
    this.listenTo(this.collection, "add", this.addList);
    var view = this;
    this.collection.each(function (list) {
      view.addList(list);
    });
  },
  
  addList: function (list) {
    var listShow = new TrelloClone.Views.ListShow({
      model: list,
      collection: list.cards(),
      lists: this.collection
    });
    
    this.addSubview("ul.lists", listShow);
  },
  
  onRender: function () {
    var view = this;
    this.$('ul.lists').sortable({
      update: view.updateList.bind(view)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },
  
  render: function () {
    var content = this.template({ 
      lists: this.collection 
    });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    
    return this;
  },
  
  updateList: function (event, ui) {
    var $item = $(ui.item);
    var newOrd = $item.index();
    var list = this.collection.get($item.data("list-id"));
    var urlUpdate = "/api/lists/";
    urlUpdate += list.id + "/update_ord";
    list.set('old_ord', list.get("ord"));
    list.set("ord", newOrd);
    var jsonData = {"list": list.attributes};
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