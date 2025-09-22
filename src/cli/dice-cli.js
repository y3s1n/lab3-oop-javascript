#!/usr/bin/env node
import { DiceRoller } from '../application/DiceRoller.js';
import { TextRenderer } from '../application/TextRenderer.js';
import { JsonRenderer } from '../application/JsonRenderer.js';
/**
 * Command-line interface for the dice roller
 */
class DiceCLI {
  #roller;
  constructor() {
    // Default to text renderer
    this.#roller = new DiceRoller(new TextRenderer());
  }
  /**
   * Parses command line arguments and executes appropriate action
   */
  run() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
      this.showHelp();
      return;
    }
    const command = args[0].toLowerCase();
    switch (command) {
      case '--help':
      case '-h':
        this.showHelp();
        break;
      case '--json':
      case '-j':
        // Switch to JSON renderer for next command
        this.#roller = new DiceRoller(new JsonRenderer());
        this.handleRoll(args.slice(1));
        break;
      case '--multiple':
      case '-m':
        this.handleMultiple(args.slice(1));
        break;
      case '--info':
      case '-i':
        this.handleInfo(args.slice(1));
        break;
      case '--examples':
      case '-e':
        this.showExamples();
        break;
      default:
        // Assume it's a dice notation
        this.handleRoll(args);
        break;
    }
  }
  /**
   * Handles a single roll
   * @private/**
   * Parses command line arguments and executes appropriate action
   */
  run() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
      this.showHelp();
      return;
    }
    const command = args[0].toLowerCase();
    switch (command) {
      case '--help':
      case '-h':
        this.showHelp();
        break;
      case '--json':
      case '-j':
        // Switch to JSON renderer for next command
        this.#roller = new DiceRoller(new JsonRenderer());
        this.handleRoll(args.slice(1));
        break;
      case '--multiple':
      case '-m':
        this.handleMultiple(args.slice(1));
        break;
      case '--info':
      case '-i':
        this.handleInfo(args.slice(1));
        break;
      case '--examples':
      case '-e':
        this.showExamples();
        break;
      default:
        // Assume it's a dice notation
        this.handleRoll(args);
        break;
    }
  }
  /**
   * Handles a single roll
   * @private
   */
  handleRoll(args) {
    if (args.length === 0) {
      console.error('Error: No dice notation provided');
      console.log('Usage: dice [notation]');
      console.log('Example: dice 3d6+2');
      process.exit(1);
    }
    const notation = args[0];
    const result = this.#roller.roll(notation);
    console.log(result);
  }
  /**
   * Handles multiple rolls
   * @private
   */
  handleMultiple(args) {
    if (args.length < 2) {
      console.error('Error: Usage: dice --multiple [notation] [times]');
      console.log('Example: dice --multiple 3d6 10');
      process.exit(1);
    }
    const notation = args[0];
    const times = parseInt(args[1], 10);
    if (isNaN(times)) {
      console.error('Error: Times must be a number');
      process.exit(1);
    }
    const result = this.#roller.rollMultiple(notation, times);
    console.log(result);
  }
  /**
   * Shows info about a dice notation
   * @private
   */
  handleInfo(args) {
    if (args.length === 0) {
      console.error('Error: No dice notation provided');
      console.log('Usage: dice --info [notation]');
      process.exit(1);
    }
    const notation = args[0];
    const info = this.#roller.getInfo(notation);
    console.log(info);
  }

  /**
   * Handles a single roll
   * @private
   */
  handleRoll(args) {
    if (args.length === 0) {
      console.error('Error: No dice notation provided');
      console.log('Usage: dice [notation]');
      console.log('Example: dice 3d6+2');
      process.exit(1);
    }
    const notation = args[0];
    const result = this.#roller.roll(notation);
    console.log(result);
  }
  /**
   * Handles multiple rolls
   * @private
   */
  handleMultiple(args) {
    if (args.length < 2) {
      console.error('Error: Usage: dice --multiple [notation] [times]');
      console.log('Example: dice --multiple 3d6 10');
      process.exit(1);
    }
    const notation = args[0];
    const times = parseInt(args[1], 10);
    if (isNaN(times)) {
      console.error('Error: Times must be a number');
      process.exit(1);
    }
    const result = this.#roller.rollMultiple(notation, times);
    console.log(result);
  }
  /**
   * Shows info about a dice notation
   * @private
   */
  handleInfo(args) {
    if (args.length === 0) {
      console.error('Error: No dice notation provided');
      console.log('Usage: dice --info [notation]');
      process.exit(1);
    }
    const notation = args[0];
    const info = this.#roller.getInfo(notation);
    console.log(info);
  }
  /**
   * Shows help information
   * @private
   */
  showHelp() {
    console.log(
      `
Dice Roller CLI
===============
A command-line dice roller supporting standard dice notation.
Usage:
dice [notation] Roll dice using notation
dice --json [notation] Output result as JSON
dice --multiple [notation] [times] Roll multiple times
dice --info [notation] Show min/max/average for notation
dice --examples Show example notations
dice --help Show this help
Options:
-h, --help Show help
-j, --json Output as JSON instead of text
-m, --multiple Roll multiple times
-i, --info Show information about notation
-e, --examples Show example dice notations
Examples:
dice 3d6 Roll three six-sided dice
dice 2d20+5 Roll two d20s and add 5
dice --json d100 Roll a d100 with JSON output
dice -m 4d6 6 Roll 4d6 six times
dice -i 2d8+3 Show min/max for 2d8+3
`.trim()
    );
  }
  /**
   * Shows example notations
   * @private
   */
  showExamples() {
    console.log(
      `
Dice Notation Examples
======================
Basic Rolls:
d6 Single six-sided die
d20 Single twenty-sided die
d100 Percentile die
Multiple Dice:
3d6 Three six-sided dice
2d8 Two eight-sided dice
4d6 Four six-sided dice (common for ability scores)
With Modifiers:
d20+5 d20 plus 5 (skill check)
2d6+3 Two d6 plus 3
3d8-2 Three d8 minus 2
Complex Expressions:
2d6+1d8 Two d6 plus one d8
d20+d4+2 d20 plus d4 plus 2
3d6+2d4-1 Complex combination
Common Gaming Dice:
d4 Four-sided (pyramid)
d6 Six-sided (cube)
d8 Eight-sided (octahedron)
d10 Ten-sided
d12 Twelve-sided (dodecahedron)
d20 Twenty-sided (icosahedron)
d100 Percentile dice
`.trim()
    );
  }
}
// Run the CLI
const cli = new DiceCLI();
cli.run();
