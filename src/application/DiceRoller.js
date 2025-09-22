import { DiceNotation } from '../domain/DiceNotation.js';
/**
 * Application service that coordinates dice rolling with rendering
 * Demonstrates dependency injection pattern
 */
export class DiceRoller {
  #renderer;
  #history;
  /**
   * Creates a new DiceRoller with injected renderer
   * @param {Object} renderer - The renderer to use for output
   */
  constructor(renderer) {
    if (!renderer || typeof renderer.render !== 'function') {
      throw new Error('Renderer must have a render method');
    }
    this.#renderer = renderer;
    this.#history = [];
  }
  /**
   * Rolls dice using the given notation
   * @param {string} notation - Dice notation (e.g., "3d6+2")
   * @returns {string} Rendered result
   */
  roll(notation) {
    try {
      const parsed = DiceNotation.parse(notation);
      const result = parsed.roll();
      // Store in history
      this.#history.push({
        notation,
        result: result.total,
        timestamp: new Date()
      });
      // Use injected renderer
      return this.#renderer.render(result);
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
  /**
   * Rolls dice multiple times
   * @param {string} notation - Dice notation
   * @param {number} times - Number of times to roll
   * @returns {string} Rendered results with statistics
   */
  rollMultiple(notation, times) {
    if (times < 1 || times > 1000) {
      return 'Error: Roll count must be between 1 and 1000';
    }
    try {
      const parsed = DiceNotation.parse(notation);
      const rolls = [];
      for (let i = 0; i < times; i++) {
        const result = parsed.roll();
        rolls.push(result.total);
      }
      // Add to history
      this.#history.push({
        notation: `${notation} x${times}`,
        result: rolls,
        timestamp: new Date()
      });
      // Render statistics
      if (this.#renderer.renderStatistics) {
        return this.#renderer.renderStatistics(rolls, notation);
      }
      // Fallback if renderer doesn't support statistics
      const avg = (rolls.reduce((a, b) => a + b, 0) / rolls.length).toFixed(2);
      return `Rolled ${notation} ${times} times.\nResults: ${rolls.join(',')}\nAverage: ${avg}`;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
  /**
   * Gets the roll history
   * @returns {Array} Array of roll history entries
   */
  getHistory() {
    return [...this.#history]; // Return copy to prevent modification
  }
  /**
   * Clears the roll history
   */
  clearHistory() {
    this.#history = [];
  }
  /**
   * Gets information about min/max for a notation
   * @param {string} notation - Dice notation
   * @returns {string} Information about the notation
   */
  getInfo(notation) {
    try {
      const parsed = DiceNotation.parse(notation);
      const info = {
        notation,
        min: parsed.getMin(),
        max: parsed.getMax(),
        average: ((parsed.getMin() + parsed.getMax()) / 2).toFixed(2)
      };
      // Simple text output for info
      return [
        `Notation: ${info.notation}`,
        `Minimum: ${info.min}`,
        `Maximum: ${info.max}`,
        `Average: ${info.average}`
      ].join('\n');
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}
