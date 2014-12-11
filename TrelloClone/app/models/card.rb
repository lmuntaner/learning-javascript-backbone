# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  list_id     :integer          not null
#  description :text
#  ord         :float            default(0.0)
#  created_at  :datetime
#  updated_at  :datetime
#

class Card < ActiveRecord::Base
  belongs_to :list
  has_many :items, dependent: :destroy
  has_many :card_assignments, dependent: :destroy

  default_scope { order(:ord) }
  
  def update_ord_same_list(card_params)
    dir = card_params["old_ord"] <=> card_params["ord"]
    sortedOrd = [card_params["old_ord"].to_f - dir, card_params["ord"].to_f].sort
    whereStr = "list_id = #{card_params['list_id']} AND ord BETWEEN #{sortedOrd[0] } AND #{sortedOrd[1]}"
    cardsToSort = self.class.where(whereStr)
    cardsToSort.map do |card|
      card.ord += dir
      card.save!
    end
    self.ord = card_params["ord"]
    self.save!
  end
  
  def update_ord_diff_list(card_params)
    whereStr = "list_id = #{card_params['list_id']} AND ord >= #{card_params['ord']}"
    cardsToSort = self.class.where(whereStr)
    cardsToSort.map do |card|
      card.ord += 1
      card.save!
    end
    self.list_id = card_params["list_id"]
    self.ord = card_params["ord"]
    self.save!
  end
end
