# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  board_id   :integer          not null
#  ord        :float            default(0.0)
#  created_at :datetime
#  updated_at :datetime
#

class List < ActiveRecord::Base
  validates :title, :board, :ord, presence: true

  belongs_to :board
  has_many :cards, dependent: :destroy

  default_scope { order(:ord) }

  # TODO: class method for updating orders?
  def update_ord(list_params)
    dir = list_params["old_ord"] <=> list_params["ord"]
    sortedOrd = [list_params["old_ord"].to_f - dir, list_params["ord"].to_f].sort
    whereStr = "ord BETWEEN #{sortedOrd[0] } AND #{sortedOrd[1]}"
    listsToSort = self.class.where(whereStr)
    listsToSort.map do |list|
      list.ord += dir
      list.save!
    end
    self.ord = list_params["ord"]
    self.save!
  end
  
  def update_cards_ord(ord)
    whereStr = "list_id = #{self.id} AND ord >= #{ord}"
    cardsToSort = Card.where(whereStr)
    cardsToSort.map do |card|
      card.ord -= 1
      card.save!
    end
  end
end
