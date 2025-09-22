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


}