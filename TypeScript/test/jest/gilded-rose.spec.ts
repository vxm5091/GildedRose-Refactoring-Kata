import { GildedRose } from '@/gilded-rose';
import { Item } from '@/inventory';

describe('Gilded Rose', () => {
  it('decrease by 1', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 46)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });
  
  it('increase by 3 if sellIn < 6', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 46)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(49);
  });
  
  it('increase by 2 if 5 < sellIn < 11', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 46)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(48);
  });
  
  it('increase by 1 if sellIn > 10', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 46)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(47);
  });
  
  it('drop to 0 if sellIn < 0', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 46)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  
  it('should decrease by 4 (regular item decreases by 2 since sellIn < 0)', () => {
    const gildedRose = new GildedRose([new Item("Conjured flask", -2, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
  });
  
  it('should increase by 1 because Aged Brie', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -2, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });
  
  it('should max out at 50', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
  
  it('should hold its value and not decrease in sellIn because legendary item', () => {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(1);
  });
});
