import { Item } from '@/inventory';


export interface ICustomItem {
  item: Item;
  isLegendary?: boolean;
  getRateOfQualityChange: () => number;
  update: (change: number, isLegendary: boolean) => void;
}
