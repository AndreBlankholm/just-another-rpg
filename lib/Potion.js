
function Potion(name,) {  // constructor function.. takes in a name parameter and assign it a (value property) to be a random number between 7 and 12
    this.types = ['strength', 'agility', 'health']; //creates a random potion array
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)]; //picks an random type
  
    if (this.name === 'health') { // logic so that if the potion is a health potion,   this ceates a heath potion
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
  
  module.exports = Potion;

