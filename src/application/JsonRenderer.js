/**
 * Renders dice results as JSON
 */
export class JsonRenderer {
  /**
   * Renders dice roll results as JSON
   * @param {Object} result - The result from DiceNotation.parse().roll()
   * @returns {string} JSON representation
   */
  render(result) {
    const output = {
      total: result.total,
      dice: result.dice || [],
      modifiers: result.modifiers || [],
      breakdown: this.#createBreakdown(result)
    };
    return JSON.stringify(output, null, 2);
  }
  /**
   * Creates a breakdown of the roll
   * @private
   * @param {Object} result - The roll result
   * @returns {Object} Breakdown object
   */
  #createBreakdown(result) {
    const breakdown = {
      parts: [],
      formula: ''
    };
    // Add dice parts
    if (result.dice && result.dice.length > 0) {
      result.dice.forEach(die => {
        breakdown.parts.push({
          type: 'dice',
          notation: die.notation,
          rolls: die.rolls,
          subtotal: die.subtotal
        });
      });
    }
    // Add modifier parts
    if (result.modifiers && result.modifiers.length > 0) {
      result.modifiers.forEach(mod => {
        breakdown.parts.push({
          type: 'modifier',
          value: mod
        });
      });
    }
    // Create formula string
    const formulaParts = [];
    breakdown.parts.forEach(part => {
      if (part.type === 'dice') {
        formulaParts.push(`${part.notation}(${part.rolls.join('+')})`);
      } else {
        formulaParts.push(part.value > 0 ? `+${part.value}` : `${part.value}`);
      }
    });
    breakdown.formula = formulaParts.join(' ');
    return breakdown;
  }
  /**
   * Renders statistics for a series of rolls
   * @param {number[]} rolls - Array of roll totals
   * @param {string} notation - The dice notation used
   * @returns {string} Statistics as JSON
   */
  renderStatistics(rolls, notation) {
    if (rolls.length === 0) {
      return JSON.stringify({ error: 'No rolls to analyze' }, null, 2);
    }
    const sum = rolls.reduce((a, b) => a + b, 0);
    const avg = sum / rolls.length;
    const min = Math.min(...rolls);
    const max = Math.max(...rolls);
    const stats = {
      notation,
      count: rolls.length,
      average: parseFloat(avg.toFixed(2)),
      min,
      max,
      sum,
      rolls
    };
    return JSON.stringify(stats, null, 2);
  }
}
