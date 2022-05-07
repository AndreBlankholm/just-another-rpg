const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');  // potion is Mocked right here // its a (jest) method



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



  test("gets player's health value", () => {  // gets current health value
    const player = new Player('Dave');
  
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
  });




  test('checks to see if the player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();

  });

  test("subtract from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth -5);

    player.reduceHealth(9999); // taking player health to check if it goes negitive or not

    expect(player.health).toBe(0); // checking if 0 is valid

  });

  //////////////////////////////////////  PLAYER ATTACK TESTS ////////////////

  test("get players's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
  });


  test('add a potion to inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;  //gets current count

    player.addPotion(new Potion());           // adds to current count

    expect(player.inventory.length).toBeGreaterThan(oldCount);  // checks to see if current count is greater than old count    
  });

//-----------------------   removes the correct Potion from the Player inventory.

  test('uses a potion from inventory', () => {
    const player = new Player('dave');

    player.inventory = [new  Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);  // uses the index of the potion to keep track of which one has been selected

    expect(player.inventory.length).toBeLessThan(oldCount); // keeepin track of old inventory so that the .length doesnt go below zero.
  });
