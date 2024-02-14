import { ICustomItem } from './interfaces';
import {
  AgedBrie,
  BackstagePasses,
  ConjuredItem,
  Item,
  LegendaryItem,
  RegularItem,
} from './inventory';

export class GildedRose {
  
  // stores the respective custom class for each esoteric item
  // removes hard coded logic from getCustomItem()
  private static itemClassReference = [
    {
      name: 'Backstage passes to a TAFKAL80ETC concert',
      class: BackstagePasses,
    },
    { name: 'Aged Brie', class: AgedBrie },
    { name: 'Sulfuras, Hand of Ragnaros', class: LegendaryItem },
    { pattern: 'Conjured', class: ConjuredItem },
  ];
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // find matching class based on full name match or partial pattern match ('Conjured')
  // otherwise return RegularItem instance
  getCustomItem(item: Item): ICustomItem {
    const itemClass =
      GildedRose.itemClassReference.find(
        ic =>
          item.name === ic.name ||
          (ic.pattern && item.name.includes(ic.pattern)),
      )?.class || RegularItem;
    return new itemClass(item);
  }

  updateQuality() {
    return this.items.map(item => {
      const customItem = this.getCustomItem(item);
      customItem.update()
      return customItem.item;
    });
  }
}
