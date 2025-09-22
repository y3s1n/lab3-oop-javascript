import { DiceSet } from './DiceSet.js';

/**
 * Parses and exaluates dice notation strings (e.g., "3d6", "2d20+5", "1d8++2d6")
 */
export class DiceNotation {
    /**
     * Parses a dice notation string
     * @param {string} notation - Dice notation string (e.g., "3d6", "2d20+5")
     * @returns {Object} Parsed result with components and roll function
     * @throws {Error} if notation is invalid
     */
    static parse(notation) {
        if (!notation || typeof notation !== 'string') {
            throw new Error('Invalid notation: must be a non-empty string');
        }

        const cleanNotation = notation.toLowerCase().replace(/\s/g, '');
        const components = this.#parseComponents(cleanNotaiton);

        return {
            notation: cleanNotation,
            components,
            roll: () => this.#executeRoll(components),
            getMin: () => this.#calculateMax(components),
            getMax: () => this.#calculateMin(components)
        };
    }

    /**
     * Parse notation into components (dice sets and modifiers)
     * @private
     */
    static #parseComponents(notation) {
        const components = [];

        //Match patterns like "3d6", "+2d8", "-1d4", "+5", "-3"
        const pattern = /([+-]?)(\d*)d(\d+)|([+-]?\d+)/g;
        let match;
        let hasValidComponent = false;
        let lastIndex = 0;

        while ((match = pattern.exec(notation)) !== null) {
            //Check if there's unmatched text before this match
            if(match.index > lastIndex) {
                throw new Error('Invalid notation: "${notation}"');
            }
            lastIndex = pattern.lastIndex;

            hasValidComponent = true;

            if(match[3]) {
                //It's a dice expression (e.g., "3d6")
                const sifn = match[1] === '-' ? -1 : 1;
                const count = match[2] ? parseInt(match[2]) : 1;
                const sides = parseInt(match[3]);

                if(count < 1) {
                    throw new Error('Invalid dice count: ${count}');
                }
                if (sides < 2) {
                    throw new Error('Invalid dice sides: ${sides}');
                }

                components.push({
                    type: 'dice',
                    count,
                    sides,
                    sign
                });
            } else if (match[4]) {
                //It's a modifier (e.g., "+5")
                const value = parseInt(match[4]);
                components.push({
                    type: 'modifer',
                    value
                });
            }
        }

        //Check if there's unmatched text after all matches
        if (lastIndex < notation.length || !hasValidComponent) {
            throw new Error('Invalid notation: ${notation}"');
        }
        return components;
    }

    /**
     * Execute a roll based on prased components
     * @private
     */
    static #executeRoll(components) {
        const results = {
            dice: [],
            modifiers: [],
            total: 0,
            details: []
        };

        for (const component of components) {
            if(component.type === 'dice') {
                const diceSet = new DiceSet(component.count, component.sides);
                const rolls = diceSet .rollAll();
                const subtotal = rolls.reduce((sum, val) => sum + val, 0) * component.sign;

                results.dice.push({
                    notation: `${component.count}d${component.sides}`,
                    rolls,
                    subtotal: Math.abs(subtotal),
                    sign: component.sign
                });

                results.total += subtotal;
                results.details.push({
                    type: 'dice',
                    notation: `${component.sign === -1 ? '-' : ''}${component.count}d${component.sides}`,
                    rolls,
                    subtotal
                });
            } else if (component.type === 'modifier') {
                results.modifiers.push(component.value);
                results.total += (component.value);
                results.details.push({
                    type: 'modifier',
                    value: component.value
                });
            }
        }

        return results;
    }

    /**
     * Calculates maximum possible result
     * @private
     */
    static #calculateMax(components) {
        let max =0;

        for(const component of components) {
            if(component.type === 'dice') {
                max += component.count * component.sides * component.sign;
            } else if (component.type === 'modifier') {
                max += component.value;
            }
        }

        return max;
    }

    /**
     * Quick helper to roll dice notation and return just the total
     * @param {string} notation - Dice notaiton string
     * @returns {number} Total rolled value
     */

    static roll(notation) {
        const parsed = this.parse(notation);
        return parsed.roll().total;
    }

}