TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "boards/:id": "showBoard"
  },
  
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new TrelloClone.Collections.Boards();
    this.collection.fetch();
  },
  
  index: function() {
    var indexView = new TrelloClone.Views.BoardIndex({
      collection: this.collection
    });
    
    this._swapView(indexView);
  },
  
  showBoard: function(id) {
    var board = this.collection.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({
      model: board,
    });
    this._swapView(showView);
  },
  
  _swapView: function(newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    this.$rootEl.html(newView.render().$el);
    this.currentView = newView;
  }
})