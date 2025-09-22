import { Die } from './src/domain/Die.js';
import { DiceSet } from './src/domain/DiceSet.js';
import { DiceNotation } from './src/domain/DiceNotation.js';

//Try a single die
const d20 = new Die(20);
console.log('Rollinf d20:', d20.roll());

//Try a set of dice
const dice = new DiceSet(3, 6);
console.log('Rolling 3d6:', dice.rollAll(), 'Total:', dice.getTotal());

//Try notation parsing
console.log('Rolling 2d8+5:', DiceNotation.roll('2d8+5'));
