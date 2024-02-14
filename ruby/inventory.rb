class Item
  attr_accessor :name, :sell_in, :quality

  def initialize(name, sell_in, quality)
    @name = name
    @sell_in = sell_in
    @quality = quality
  end

  def to_s()
    "#{@name}, #{@sell_in}, #{@quality}"
  end
end

# ------------------------------------------ Base Class ------------------------------------------ */
# abstracts the logic of "updating an item" and provides subclasses with necessary overrides to define specific behavior
class CustomItemBase
  attr_reader :item

  def initialize(item)
    @item = item
  end

  protected

  # Can be overridden by subclasses like Legendary Item that don't need to be sold
  def should_update_sell_in?
    true
  end

  # can be overridden as needed by subclasses like Legendary Item
  def max_quality
    50
  end

  def min_quality
    0
  end

  # default behavior. can be overridden by individual subclasses as needed
  def rate_of_quality_change
    change = -1
    change = -2 if item.sell_in.negative?
    change
  end

  public

  def update()
    @item.sell_in -= 1 if should_update_sell_in?
    updated_quality = item.quality + rate_of_quality_change
    updated_quality = [updated_quality, max_quality].min # can't be higher than max 
    updated_quality = [updated_quality, min_quality].max # can't be lower than min
    @item.quality = updated_quality
  end
end

# ------------------------------------------ Custom Item Classes ------------------------------------------ */
# getRateOfQualityChange() defines item-specific logic
# isLegendary (optional) bypasses max quality value and sellIn change
class RegularItem < CustomItemBase
end

class BackstagePasses < CustomItemBase
  protected

  def rate_of_quality_change
    sell_in = item.sell_in
    quality = item.quality

    return -quality if sell_in.negative?

    change = 1
    change += 1 if sell_in < 11
    change += 1 if sell_in < 6

    change
  end
end

class LegendaryItem < CustomItemBase
  protected

  def rate_of_quality_change
    0
  end

  def should_update_sell_in?
    false
  end

  def max_quality
    Float::INFINITY
  end
end

class AgedBrie < CustomItemBase
  protected

  def rate_of_quality_change
    1
  end
end

class ConjuredItem < CustomItemBase
  protected

  def rate_of_quality_change
    # 	degrades in quality 2x rate of normal item
    # 	get rate of change if this were a normal item
    regular_item = RegularItem.new(item)
    regular_change = regular_item.rate_of_quality_change
    regular_change * 2
  end
end


