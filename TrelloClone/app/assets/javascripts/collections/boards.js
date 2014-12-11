TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: TrelloClone.Models.Board,
  getOrFetch: function (id) {
    var board = this.get(id);
    var collection = this;
    if (!board) {
      board = new TrelloClone.Models.Board({ id: id });
      board.fetch({
        success: function(model) {
          collection.add(model);
        }
      })
    }
    
    return board;
  }
})