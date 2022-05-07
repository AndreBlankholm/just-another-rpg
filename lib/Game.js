const inquirer = require("inquirer");
const Enemy = require("./Enemy"); // These are the Dependencies
const Player = require("./Player");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy; //undefined and will be assigned in the initializeGame function
  this.player; //undefined and will be assigned in the initializeGame function
}

Game.prototype.initializeGame = function () {
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "baseball bat"));
  this.enemies.push(new Enemy("skeleton", "axe")); //The initializeGame() method is where we'll set up the Enemy and Player objects.
  this.currentEnemy = this.enemies[0]; ///---- this current enemey TRACKS which Enemy object is currently fighting !!!

  /////------------ PLAYER ---

  inquirer                // prompt the user for their name, which will become the Player name.
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // destructure name from the prompt object
    .then(({ name }) => {              // pushes player name to Player name in Player.js
      this.player = new Player(name);

      // test the object creation
      //(commented out)  console.log(this.currentEnemy, this.player);  

      this.startNewBattle()  // placeholder for starting a new round
    });
};

module.exports = Game;
