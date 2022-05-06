const Potion = require('../lib/Potion.js');


test('creates a health potion object', () => {  //creating a health potion
    const potion = new Potion('health'); // creating a new potion object
  
    expect(potion.name).toBe('health'); // testing for a name: 'health'
  
    expect(potion.value).toEqual(expect.any(Number)); //testing for a number of some kind (any) so that the test has more flexibility.
    
  });

  test('creates a random potion object', () => {  //create a falling constructor object test here first
    const potion = new Potion();  // name new object constructor here first and assign
  
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
  });

