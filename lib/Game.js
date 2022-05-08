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
  this.enemies.push(new Enemy("skeleton", "axe"));              //The initializeGame() method is where we'll set up the Enemy and Player objects.
  this.currentEnemy = this.enemies[0];                         ///---- this current enemey TRACKS which Enemy object is currently fighting !!!

  /////------------ PLAYER ---

  inquirer                                                    // prompt the user for their name, which will become the Player name. 
    .prompt({                                                 // dependencies need (inquirer) question prompt in command line.
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // destructure name from the prompt object
    .then(({ name }) => {                                   // pushes player name to Player name in Player.js
      this.player = new Player(name);

      // test the object creation
      //(commented out)  console.log(this.currentEnemy, this.player);  app js, put this code and run node app.js= line 1) const Game = require('./lib/Game'); line 2) new Game().initializeGame();

      this.startNewBattle()  // placeholder for starting a new round

    });
};

//The startNewBattle() method will be called to kick off the first battle and then called again anytime a new round starts. We want this method to do the following things:
//Establish who will take their turn first based on their agility values.
//Display the Player object's stats.
//Display the description of the current Enemy.

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');  // Next 2 lines, we need to display the Player stats.
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());  // displaying the Enemy discription

    this.battle();   //battle() method will be responsible for each individual turn in the round
   
  };                                                                                                   //this.initializeGame() calls this.startNewBattle(), which in turn calls this.battle()

 
  Game.prototype.battle = function() {   //The battle() method is the main event of the game that will run an indefinite number of times
  
    if (this.isPlayerTurn) {
      inquirer
        .prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['Attack', 'Use potion']
        })
        .then(({ action }) => {  // referes to iquirer prompt name parameter with the value of (action)

          if (action === 'Use potion') {
            if (!this.player.getInventory()) {             // checking for any inventory before displaying choices to the user
              console.log("You don't have any potions!");
              return;
            }
          
            inquirer
              .prompt({
                type: 'list',
                message: 'Which potion would you like to use?',
                name: 'action',
                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)   // .map() and inside inventory and give an object array that starts like this||  1:agility, 2: health, 3: strength
              })
              .then(({ action }) => {
                const potionDetails = action.split(': ');  // then create a var (potionsDetails)(in scope) and make that eual to splitting : out the return up above
            
                this.player.usePotion(potionDetails[0] - 1);            // then reset the arrays current index without the 0 back to an array that starts with zero
                console.log(`You used a ${potionDetails[1]} potion.`);
              });
          } else {
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);
    
            console.log(`You attacked the ${this.currentEnemy.name}`);
            console.log(this.currentEnemy.getHealth());
          }
        });
    }


  };
   
module.exports = Game;
