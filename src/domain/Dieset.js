import { Die } from '/Die.js';

/**
 * Represents a collection of dice that can be rolled together
 */
export class DieSet {
    #dice;

    /**
     * Creates a new set of dice
     * @param {number} count - Number of dice in the set
     * @param {number} sides - Number of sides on each die (default: 6)
     * @throws {Error} If count is less than 1
     */
    constructor(count = 1, sides = 6) {
        if (count < 1) {
            throw new Error ('DieSet must contain at least 1 die');
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
        return 'stubbed';
    }

    /**
     * Gets the current values of all dice
     * @returns {Array<number|null>} Array of current values
     */ 
    getValues() {
        return 'stubbed';
    }

    /**
     * Gets the total of all current die values
     * @returns {number|null} Total or null if any die hasnt been rolled
     */
    getTotal() {
        return 'stubbed';
    }

    /**
     * Gets the number of dice in the set
     * @returns {number} Number of dice
     */
    getCount() {
        return 'stubbed';
    }

    /**
     * Gets the number of sides on each die (assumes all dice are identical)
     * @returns {number} Number of sides
     */
    getSides() {
        return 'stubbed';
    }

    /**
     * Resets all dice to unrolled state
     */
    reset() {
        return 'stubbed';
    }

    /**
     * Gets the minimum possible total
     * @returns {number} Minimum possible total
     */
    getMinTotal() {
        return 'stubbed';
    }

    /**
     * Gets the maximum possible total
     * @returns {number} Maximum possible total
     */
    getMaxTotal() {
        return 'stubbed';
    }


}