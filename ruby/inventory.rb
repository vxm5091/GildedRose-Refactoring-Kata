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
# abstracts the updating of quality and sellIn values in the Item class dependency
class CustomItemBase
  attr_accessor :item

  def initialize(item)
    @item = item
    @max_quality = 50
    @min_quality = 0
  end

  def legendary?
    false
  end

  private

  attr_reader :max_quality, :min_quality

  def update_quality(change)
    updated_quality = @item.quality + change
    unless legendary?
      updated_quality = [updated_quality, max_quality].min
      updated_quality = [updated_quality, min_quality].max
    end

    @item.quality = updated_quality
  end

  def update_sell_in
    @item.sell_in -= 1 unless legendary?
  end

  public

  def update(change)
    update_sell_in
    update_quality(change)
  end
end


# ------------------------------------------ Custom Item Classes ------------------------------------------ */
# getRateOfQualityChange() defines item-specific logic
# isLegendary (optional) bypasses max quality value and sellIn change
class RegularItem < CustomItemBase
  def rate_of_quality_change
    change = -1
    change = -2 if item.sell_in.negative?
    change
  end
end

class BackstagePasses < CustomItemBase
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
  def rate_of_quality_change
    0
  end

  def legendary?
    true
  end
end

class AgedBrie < CustomItemBase
  def rate_of_quality_change
    1
  end
end

class ConjuredItem < CustomItemBase
  def rate_of_quality_change
    # 	degrades in quality 2x rate of normal item
    # 	get rate of change if this were a normal item
    regular_item = RegularItem.new(item)
    regular_change = regular_item.rate_of_quality_change
    regular_change * 2
  end
end


