const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');  // potion is Mocked right here // its a (jest) method

console.log(new Potion);

const Player = require('../lib/Player');


test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
      expect.arrayContaining([expect.any(Object)])   // player's inventory should be an array containing an object 
    );
  });

  test('gets players stats of a object', () => {  // checking that the object comes back with 4 specific properties
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');

  });

  test('get inventory from player or returns false', () => { // (callback function)

    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array)); // test part 1. inventory to have items

    player.inventory = [];  // simulating an empty array

    expect(player.getInventory()).toEqual(false); // test part 2. inventory to be empty
  });

  