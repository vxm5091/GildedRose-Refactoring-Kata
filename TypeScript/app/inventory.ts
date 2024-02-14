import { ICustomItem } from './interfaces';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

/* ------------------------------------------ Base Class ------------------------------------------ */
/**
 * abstracts the updating of quality and sellIn values on the Item class dep
 *  */
abstract class CustomItemBase {
  private readonly _item: Item;

  constructor(item: Item) {
    this._item = item;
  }

  get item() {
    return this._item;
  }

  // can be overridden as needed by subclasses like Legendary Item
  protected get maxQuality(): number {
    return 50;
  }

  protected get minQuality(): number {
    return 0;
  }

  // Can be overridden by subclasses like Legendary Item that don't need to be sold
  protected get shouldUpdateSellIn(): boolean {
    return true;
  }

  // default behavior. can be overridden by individual subclasses as needed
  public getRateOfQualityChange() {
    let change = -1;
    if (this.item.sellIn < 0) change = -2;
    return change;
  }

  public update() {
    if (this.shouldUpdateSellIn) {
      this.item.sellIn--;
    }
    const change = this.getRateOfQualityChange();
    let updatedQuality = this.item.quality + change;

    updatedQuality = Math.min(updatedQuality, this.maxQuality); // can't go above max value
    updatedQuality = Math.max(updatedQuality, this.minQuality); // can't go below min value

    this._item.quality = updatedQuality;
  }
}

/* ------------------------------------------ Custom Item Classes ------------------------------------------ */
export class RegularItem extends CustomItemBase implements ICustomItem {}

export class BackstagePasses extends CustomItemBase implements ICustomItem {
  getRateOfQualityChange() {
    const { sellIn, quality } = this.item;
    if (sellIn < 0) return -quality; // worthless after concert date
    let change = 1;
    if (sellIn < 11) change++; // Quality increases by 1 extra point if <11 days to concert (2 total)
    if (sellIn < 6) change++; // Quality increases by 1 extra point if <6 days to concert (3 total)
    return change;
  }
}

/**
 *  overrides maxQuality() and shouldUpdateSellIn() methods
 * */
export class LegendaryItem extends CustomItemBase implements ICustomItem {
  protected get maxQuality(): number {
    return Infinity;
  }

  protected get shouldUpdateSellIn(): boolean {
    return false;
  }

  getRateOfQualityChange() {
    return 0;
  }
}

export class AgedBrie extends CustomItemBase implements ICustomItem {
  getRateOfQualityChange() {
    if (this.item.quality < 50) return 1;
    return 0;
  }
}

export class ConjuredItem extends CustomItemBase implements ICustomItem {
  getRateOfQualityChange() {
    // 	degrades in quality 2x rate of normal item
    // 	get rate of change if this were a normal item
    const regularItem = new RegularItem(this.item);
    const regularChange = regularItem.getRateOfQualityChange();
    return regularChange * 2;
  }
}
