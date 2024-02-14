import { Item } from '@/inventory';
import { expect } from 'chai';
import { GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should return 46 if sellIn < 6 ', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].quality).to.equal(46);
  });
});
