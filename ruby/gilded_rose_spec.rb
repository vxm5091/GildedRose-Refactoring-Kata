require 'rspec'
require_relative 'gilded_rose' # Assuming gilded_rose.rb is in the same directory
require_relative 'inventory' # Assuming inventory.rb is in the same directory

require File.join(File.dirname(__FILE__), 'gilded_rose')

describe GildedRose do
  it "does not change the name" do
    items = [Item.new("foo", 0, 0)]
    GildedRose.new(items).update_quality
    expect(items[0].name).to eq "foo"
  end

  it "should decrease sellIn value by 1" do
    items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 5, 46)]
    GildedRose.new(items).update_quality
    expect(items[0].sell_in).to eq 4
  end

  it "should increase ticket quality by 3 if sellIn < 6" do
    items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 5, 46)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 49
  end

  it "should increase ticket quality by 2 if 5 < sellIn < 11" do
    items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 7, 46)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 48
  end

  it "should increase ticket quality by 1 if sellIn > 10" do
    items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 12, 46)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 47
  end

  it "should reduce ticket quality to 0 if sellIn < 0" do
    items = [Item.new("Backstage passes to a TAFKAL80ETC concert", -1, 46)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 0
  end

  it "should decrease conjured quality by 4 (regular item decreases by 2 since sellIn < 0)" do
    items = [Item.new("Conjured flask", -2, 20)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 16
  end

  it "should increase by 1 because Aged Brie" do
    items = [Item.new("Aged Brie", -2, 20)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 21
  end

  it "should max out at 50" do
    items = [Item.new("Aged Brie", -2, 50)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 50
  end

  it "should hold its value and not decrease in sellIn because legendary item" do
    items = [Item.new("Sulfuras, Hand of Ragnaros", 1, 80)]
    GildedRose.new(items).update_quality
    expect(items[0].quality).to eq 80
    expect(items[0].sell_in).to eq 1
  end

end
