require 'minitest/autorun'
require_relative 'gilded_rose'

class TestGildedRose < Minitest::Test
  def test_decr_by_1
    items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 5, 46)]
    GildedRose.new(items).update_quality
    assert_equal 4, items[0].sell_in
  end
end
