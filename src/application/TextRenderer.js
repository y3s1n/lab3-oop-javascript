/**
 * Renders dice results as human-readable text
 */
export class TextRenderer {
  /**
   * Renders dice roll results as text
   * @param {Object} result - The result from DiceNotation.parse().roll()
   * @returns {string} Human-readable text representation
   */
  render(result) {
    const parts = [];
    // Add dice details
    if (result.dice && result.dice.length > 0) {
      const diceDescriptions = result.dice.map(die => {
        const rollsStr = die.rolls.join(', ');
        return `${die.notation}: [${rollsStr}] = ${die.subtotal}`;
      });
      parts.push(diceDescriptions.join(' + '));
    }
    // Add modifiers
    if (result.modifiers && result.modifiers.length > 0) {
      result.modifiers.forEach(mod => {
        if (mod > 0) {
          parts.push(`+${mod}`);
        } else {
          parts.push(`${mod}`);
        }
      });
    }
    // Build final output
    const breakdown = parts.join(' ');
    return `Rolled: ${breakdown}\nTotal: ${result.total}`;
  }
  /**
   * Renders statistics for a series of rolls
   * @param {number[]} rolls - Array of roll totals
   * @param {string} notation - The dice notation used
   * @returns {string} Statistics text
   */
  renderStatistics(rolls, notation) {
    if (rolls.length === 0) {
      return 'No rolls to analyze';
    }
    const sum = rolls.reduce((a, b) => a + b, 0);
    const avg = (sum / rolls.length).toFixed(2);
    const min = Math.min(...rolls);
    const max = Math.max(...rolls);
    return [
      `Statistics for ${notation}:`,
      ` Rolls: ${rolls.length}`,
      ` Average: ${avg}`,
      ` Min: ${min}`,
      ` Max: ${max}`,
      ` Total: ${sum}`
    ].join('\n');
  }
}
