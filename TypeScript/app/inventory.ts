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
 * abstracts the updating of quality and sellIn values
 *  */
class CustomItemBase {
  item: Item;
  private readonly _maxQuality = 50;
  private readonly _minQuality = 0;

  constructor(item: Item) {
    this.item = item;
  }

  private _updateQuality(change: number, isLegendary = false) {
    let updatedQuality = this.item.quality + change;

    // logic doesn't apply to legendary item which remains at constant quality or possibly increases
    if (!isLegendary) {
      updatedQuality = Math.min(updatedQuality, this._maxQuality); // can't go above max value (50)
      updatedQuality = Math.max(updatedQuality, this._minQuality); // can't go below min value (0)
    }

    this.item.quality = updatedQuality;
  }

  private _updateSellIn(isLegendary = false) {
    if (isLegendary) return;
    this.item.sellIn--;
  }

  public update(change: number, isLegendary = false) {
    this._updateSellIn(isLegendary);
    this._updateQuality(change, isLegendary);
  }
}

/* ------------------------------------------ Custom Item Classes ------------------------------------------ */
/**
 * @method getRateOfQualityChange() defines item-specific logic
 * @property isLegendary (optional) bypasses max quality value and sellIn change
 *  */
export class RegularItem extends CustomItemBase implements ICustomItem {
  getRateOfQualityChange() {
    let change = -1;
    if (this.item.sellIn < 0) change = -2;
    return change;
  }
}

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

export class LegendaryItem extends CustomItemBase implements ICustomItem {
  isLegendary = true;
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
