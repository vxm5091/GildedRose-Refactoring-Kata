require_relative 'inventory'

class GildedRose
  # stores the respective custom class for each esoteric item
  # removes hardcoded logic from getCustomItem()
  @item_class_reference = [
    {
      name: 'Backstage passes to a TAFKAL80ETC concert',
      ref: BackstagePasses,
    },
    { name: 'Aged Brie', ref: AgedBrie },
    { name: 'Sulfuras, Hand of Ragnaros', ref: LegendaryItem },
    { pattern: 'Conjured', ref: ConjuredItem },
  ]

  class << self
    attr_reader :item_class_reference
  end

  def initialize(items)
    @items = items
  end

  # find matching class based on full name patch or partial pattern match ('Conjured')
  # otherwise return RegularItem instance
  def get_custom_item(item)
    class_ref = GildedRose.item_class_reference.find do |ic|
      item.name == ic[:name] || (ic[:pattern] && item.name.include?(ic[:pattern]))
    end
    custom_class = class_ref.nil? ? RegularItem : class_ref[:ref]
    custom_class.new(item)
  end

  def update_quality()
    @items.each do |item|
      custom_item = get_custom_item(item)
      custom_item.update()
    end
  end
end

