import { Item } from '@/inventory';


export interface ICustomItem {
  item: Item;
  getRateOfQualityChange: () => number;
  update: () => void;
}
