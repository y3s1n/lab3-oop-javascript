import { Die } from './Die.js';

/**
 * Represents a collection of dice that can be rolled together
 */
export class DiceSet {
    #dice;

    /**
     * Creates a new set of dice
     * @param {number} count - Number of dice in the set
     * @param {number} sides - Number of sides on each die (default: 6)
     * @throws {Error} If count is less than 1
     */
    constructor(count = 1, sides = 6) {
        if (count < 1) {
            throw new Error ('DiceSet must contain at least 1 die');
        }

        this.#dice = []; 
        for (let i=0; i< count; i++) {
            this.#dice.push(new Die(sides));
        }
    }

    /**
     * Rolls all dice in the set
     * @returns {number[]} Array of rolled values
     */
    rollAll() {
        const results = this.#dice.map(die => die.roll());
        return results;
    }

    /**
     * Gets the current values of all dice
     * @returns {Array<number|null>} Array of current values
     */ 
    getValues() {
        return this.#dice.map(die => die.getValue());
    }

    /**
     * Gets the total of all current die values
     * @returns {number|null} Total or null if any die hasnt been rolled
     */
    getTotal() {
        const values = this.getValues();
        if (values.some(v => v === null)) {
            return null;
        }
        return values.reduce((sum, value) => sum + value, 0);
    }

    /**
     * Gets the number of dice in the set
     * @returns {number} Number of dice
     */
    getCount() {
        return this.#dice.length;
    }

    /**
     * Gets the number of sides on each die (assumes all dice are identical)
     * @returns {number} Number of sides
     */
    getSides() {
        return this.#dice[0].getSides();
    }

    /**
     * Checks if all dice have been rolled
     * @return {boolean} True if all dice have been rolled
     */
    hasBeenRolled() {
        return this.#dice.every(die => die.hasBeenRolled());
    }

    /**
     * Resets all dice to unrolled state
     */
    reset() {
        this.#dice.forEach(die => die.reset());
    }

    /**
     * Gets the minimum possible total
     * @returns {number} Minimum possible total
     */
    getMinTotal() {
        return this.#dice.length;
    }

    /**
     * Gets the maximum possible total
     * @returns {number} Maximum possible total
     */
    getMaxTotal() {
        return this.#dice.length * this.getSides();
    }


}