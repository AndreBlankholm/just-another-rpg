const Potion = require('../lib/Potion');



function Player(name = '') {  // passes an empty string (if no name is provided)
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    
    this.inventory = [new Potion('health'), new Potion()]; // euql to an array containing any object

    // returns an object with various player properties

    Player.prototype.getStats = function() {  //method)  Using Player.prototype instead of (this)
      return {
        potions: this.inventory.length,   // .length because its an (array)
        health: this.health,
        strength: this.strength,
        agility: this.agility,
      };
    };

    // returns the inventory array or false if empty
    Player.prototype.getInventory = function() {  //method)  Using Player.prototype instead of (this)
          if(this.inventory.length) {    //returns inventory
            return this.inventory;
          }
          return false;                           // (Player.prototype) instead of (this) inorder to not make methods for evry player
        };

  }
  
  module.exports = Player;