import { GildedRose } from '@/gilded-rose';
import { Item } from '@/inventory';

describe('Gilded Rose Approval', () => {
  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[];

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += '\n';
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = '';
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('should foo', () => {
    // const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
    const items = [
      new Item('+5 Dexterity Vest', 10, 20), //
      new Item('Aged Brie', 2, 0), //
      new Item('Elixir of the Mongoose', 5, 7), //
      new Item('Sulfuras, Hand of Ragnaros', 0, 80), //
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
      // this conjured item does not work properly yet
      new Item('Conjured Mana Cake', 3, 6),
    ];

    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems).toMatchSnapshot();
  });
});
